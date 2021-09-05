import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() txtConfirm: string = "OK";


  constructor(public bsModalRef: BsModalRef,
    private router: Router) {}


  close(): void {
    if (this.txtConfirm === "NOVO RESGATE") {
      this.router.navigateByUrl('/list');
    }
    this.bsModalRef.hide();
  }
}
