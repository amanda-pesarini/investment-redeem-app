import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
    providedIn: 'root'
  })
  export class ModalService {
    modalRef!: BsModalRef;
    constructor(private modalService: BsModalService) {}

    openModal(title: string, msg: string, txtConfirm?: string) {
        this.modalRef = this.modalService.show(ModalComponent, { backdrop: 'static', keyboard: false });
        this.modalRef.content.title = title;
        this.modalRef.content.message = msg;
        if (txtConfirm) {
        this.modalRef.content.txtConfirm = txtConfirm;
        }
    }
}