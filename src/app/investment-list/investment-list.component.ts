import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Investment } from '../shared/models/investment.model';
import { InvestmentService } from '../service/investment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.css']
})

export class InvestmentListComponent implements OnInit {

  investments$!: Observable<Investment[]>;
  unsubscribe$ = new Subject<void>();

  constructor(private investmentService: InvestmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadInvestmentsList();
  }

  routeToRedeem(investment: Investment): void {
    if (investment.indicadorCarencia === 'S') {
      return;
    }
    this.investmentService.setDetailInvestment(investment);
    this.router.navigate(['redeem/', investment.nome]);
  }

  loadInvestmentsList(): void {
    this.investments$ = this.investmentService.getInvestments();
  }
}
