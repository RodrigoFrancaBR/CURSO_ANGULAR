import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-confirmacao',
    template: `

<div class="float-right mt-3">
    <button class="btn btn-light rounded border border-secondary" id="btnForcar" type="button" (click)="forcarCancelamento(content)">
        <strong class="text-secondary">Forçar Cancelamento</strong>
    </button>
</div>

<ng-template #content let-c="close" let-d="dismiss">

    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Título</h4>
      <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="modal-body">
      <p>Confirma o cancelamento da unidade?</p>
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="sim()">Sim</button>
        <button type="button" class="btn btn-secondary" (click)="nao()">Não</button>
    </div>

</ng-template>

  `,
    // templateUrl: './modal-config.html',
    // add NgbModalConfig and NgbModal to the component providers
    // providers: [NgbModalConfig, NgbModal]
})
export class ModalConfirmacaoComponent {
    ngbModalRef: NgbModalRef;

    constructor(
        ngbModalConfig: NgbModalConfig,
        private ngbModal: NgbModal) {
        // customize default values of modals used by this component tree
        ngbModalConfig.backdrop = 'static';
        ngbModalConfig.keyboard = false;
    }

    forcarCancelamento(content) {
        console.log('forçar cancelamento');
        this.abrirModal(content);
        // if (this.unidadeSelecionada) {
        //     this.abrirModal(content);
        // } else {
        //     ToastrMensagemUtil.info(this.toastr, 'É preciso selecionar um registro para forçar o cancelamento.');
        // }
    }

    abrirModal(content) {
        console.log('abrir modal');
        let modal = null;
        this.ngbModalRef = this.ngbModal.open(content, { size: 'sm', windowClass: 'forcarCancelamentoModal' });
        setTimeout(() => {
            modal = document.querySelector('.forcarCancelamentoModal');
            modal.classList.remove('fade');
        }, 100);
    }

    sim() {
        console.log('clicou no sim');
        this.ngbModalRef.close();
        // this.service.atualizaUnidade(this.unidadeSelecionada).subscribe(resp => {
        //     if (resp) {
        //         ToastrMensagemUtil.success(this.toastr, 'Status alterado com sucesso');
        //         this.dadosDaGrid = [];
        //     }
        // });
    }

    nao() {
        console.log('clicou no não');
        this.ngbModalRef.dismiss();
    }

}