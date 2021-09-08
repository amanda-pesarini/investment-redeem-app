import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { InvestmentService } from '../service/investment.service';
import { ModalService } from '../service/modal.service';
import { Action } from '../shared/models/action.model';
import { Investment } from '../shared/models/investment.model';

@Component({
  selector: 'app-investment-redeem',
  templateUrl: './investment-redeem.component.html',
  styleUrls: ['./investment-redeem.component.css'],
})
export class InvestmentRedeemComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  detailInvestment$!: Observable<Investment>;
  totalRedeem: number = 0;
  form!: FormGroup;
  detailInvestment!: Investment;
  actions!: Action[];
  errors!: string[];

  constructor(private investmentService: InvestmentService,
    private modalService: ModalService,
    private router: Router) {}

  ngOnInit(): void {
    this.getInvestmentDetail();
    this.calculateActionValue();
    this.createForm();
    this.valueChangesForm();
  }

  createForm(): void {
    this.form = new FormGroup({});
    this.detailInvestment.acoes.forEach((action) => {
      this.form.addControl(`${action.nome}`, new FormControl(''));
    });
  }

  getInvestmentDetail(): void {
    this.detailInvestment$ = this.investmentService.getDetailInvestment();
    this.detailInvestment$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((detail) => {
        this.detailInvestment = detail;
      });
  }

  calculateActionValue(): void {
    this.actions = [];
    const totalValue = this.detailInvestment.saldoTotalDisponivel;
    this.detailInvestment.acoes.forEach((action) => {
      action['valor'] = Number(
        ((action.percentual / 100) * totalValue).toFixed(2)
      );
      this.actions.push(action);
    });
  }

  valueChangesForm(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          this.errors = [];
          this.totalRedeem = 0;
          this.actions.forEach((action) => {
            if (value[action.nome] > action.valor!) {
              this.form.controls[action.nome].setErrors({ invalidValue: true });
              this.errors.push(action.nome);
              return;
            }
            if (value[action.nome]) {
              this.totalRedeem = this.totalRedeem + value[action.nome];
            }
          });
          return of({});
        })
      ).subscribe();
  }

  validateForm(): void {
    const valueForm = this.form.getRawValue();
    const isEmpty = Object.values(valueForm).every(x => x === null || x === '' || x === 0);
    if (isEmpty) {
      this.openModal('ATENÇÃO!', 'Preencha pelo menos um valor para resgate.')
      return;
    }
    if (this.errors?.length) {
      this.openModal('ATENÇÃO!', 'Um valor inválido foi informado nas ações: ' +this.errors);
      return;
    }
    this.openModal('Resgate efetuado com sucesso!', 'O valor solicitado estará em sua conta em até 5 dias úteis!', 'NOVO RESGATE');
  }
  
  openModal(title: string, message: string, txtConfirm?: string): void {
    this.modalService.openModal(title!, message!, txtConfirm!);
  }

  goToList(): void {
    this.router.navigateByUrl('/list');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
