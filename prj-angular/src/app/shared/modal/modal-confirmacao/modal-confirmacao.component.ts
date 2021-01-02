import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-confirmacao',
    templateUrl: './modal-confirmacao.component.html'
})
export class ModalConfirmacaoComponent {
    @Input() body;

    constructor(public activeModal: NgbActiveModal) { }

    dismiss() {
        this.activeModal.dismiss();
    }

    confirm() {
        this.activeModal.close();
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
