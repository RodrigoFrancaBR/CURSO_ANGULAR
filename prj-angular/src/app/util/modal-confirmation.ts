import { UnidadeService } from './../views/unidades/unidade.service';
import { Component, Output, EventEmitter, Input, OnChanges, ViewChild, ViewChildren } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ToastrMensagemUtil } from './toastr-mensagem-util';

const CLICK_EVENT = {
    OPEN: 'open',
    YES: 'yes',
    NO: 'no',
    SUCCESS: 'success'
};

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'modal-confirmation',
    template: `
<ng-template #content let-c="close" let-d="dismiss">
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Atenção</h4>
    </div>
    <div class="modal-body">
    Confirma o cancelamento da Unidade?
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="yes()">Sim</button>
        <button type="button" class="btn btn-secondary" (click)="no()">Não</button>
    </div>
</ng-template>
  `,
})
export class ModalConfirmationComponent {
    // obrigatórios para o modal

    @ViewChild('content', { static: false }) content: any;
    @Output() modalEvent = new EventEmitter();
    ngbModalRef: NgbModalRef;

    // minha regra de negócio
    @Input() unidadeSelecionada: number;
    @Output() listContratoAcordoCancelamento = new EventEmitter();


    constructor(
        // obrigatórios para o modal
        ngbModalConfig: NgbModalConfig,
        private ngbModal: NgbModal,

        // minha regra de negócio
        private toastr: ToastrService,
        private service: UnidadeService
    ) {

        // obrigatórios para o modal
        ngbModalConfig.backdrop = 'static';
        ngbModalConfig.keyboard = false;
    }

    excluir(unidadeSelecionada: number): void {
        this.unidadeSelecionada = unidadeSelecionada;
        this.open();
    }

    open() {
        console.log('clicou no open');
        let modal = null;
        this.ngbModalRef = this.ngbModal.open(
            this.content,
            { size: 'sm', windowClass: 'confirmationModal' });
        setTimeout(() => {
            modal = document.querySelector('.confirmationModal');
            modal.classList.remove('fade');
        }, 100);
        // avisa ao componente pai que clicou no open.
        // this.modalClickEvent.emit(CLICK_EVENT.OPEN);
    }


    yes() {
        console.log('clicou no yes');
        // obrigatórios para o modal
        this.ngbModalRef.close();

        // minha regra de negócio
        this.service.excluirUnidade(this.unidadeSelecionada).subscribe(response => {
            console.log(response);
            // avisa ao componente pai que teve sucesso.
            this.modalEvent.emit(CLICK_EVENT.SUCCESS);
        });
    }

    no() {
        console.log('clicou no no');
        // obrigatórios para o modal
        this.ngbModalRef.dismiss();
        // avisa ao componente pai que clicou no no.
        this.modalEvent.emit(CLICK_EVENT.NO);
    }

}
