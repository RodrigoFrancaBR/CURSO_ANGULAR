import { UnidadeService } from './../views/unidades/unidade.service';
import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { FormUtil } from './form-util';
import { AlcadaDesconto } from '../model/alcada-desconto';
import { ToastrMensagemUtil } from './toastr-mensagem-util';

const CLICK_EVENT = {
    OPEN: 'open',
    YES: 'yes',
    NO: 'no',
    SUCCESS: 'success'
};

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'modal-inclusion',
    template: `

<ng-template #content let-c="close" let-d="dismiss">

  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Incluir nova Faixa</h4>
  </div>

  <div class="modal-body">

    <form [formGroup]="formInclusao">
      <div class="form-group row">
        <label for="inpIdFila"  class="col-sm-5 col-form-label">
          <strong class="text-secondary">{{ 'FILA' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="inpIdFila" type="text" readonly class="text-secondary" formControlName="idFila">
        </div>
      </div>

      <div class="form-group row">
        <label for="inpFxInicio" class="col-sm-5 col-form-label">
          <strong class="text-secondary">{{ 'FAIXA_INICIAL' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="inpFxInicio" type="text" class="text-secondary" formControlName="fxInicio" maxlength="4">
        </div>
      </div>

      <div class="form-group row">
        <label for="inpFxFim" class="col-sm-5 col-form-label">
        <strong class="text-secondary">{{ 'FAIXA_FINAL' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="inpFxFim" type="text" class="text-secondary" formControlName="fxFim" maxlength="4" (keypress)="validarNumero($event)">
        </div>
      </div>

      <div class="form-group row">
        <label for="inpVlPercDesc" class="col-sm-5 col-form-label">
        <strong class="text-secondary">{{ 'DESCONTO'}}</strong>
        </label>
        <div class="col-sm-2">
        
        <input id="inpVlPercDesc" type="text" class="text-secondary" formControlName="vlPercDesc" maxlength="5" (keypress)="validarNumero($event)">
        </div>
      </div>
      
      <div class="form-group row">
        <input id="inpIntRent" type="checkbox" formControlName="inRent" class="col-sm-2 col-form-label">
        <label for="inpIntRent">
          <strong class="text-secondary">{{ 'INTRENT'}}</strong>
        </label>
      </div>
 
    </form>
 
  </div>
 
    <div class="modal-footer">
      <div class="col-sm-12">
        <button type="button" class="btn btn-danger" (click)="yes()">Salvar</button>
        <button type="button" class="btn btn-secondary" (click)="no()">Sair</button>
      </div>
    </div>
  </ng-template>
 
  `,
})


export class ModalInclusionComponent implements OnInit {
    // obrigatórios para o modal

    @ViewChild('content', { static: false }) content: any;
    @Output() modalEvent = new EventEmitter();
    ngbModalRef: NgbModalRef;

    // minha regra de negócio  
    formInclusao: FormGroup;
    @Input() contratoSelecionado: string;
    @Output() listContratoAcordoCancelamento = new EventEmitter();
    @Input() listaAlcadaDesconto: Array<AlcadaDesconto>;
    @Input() filaSelecionada: string
    acaoDeAbrir: string;
    alcadaDescontoDTO: AlcadaDesconto = new AlcadaDesconto();
    responseSuccess: boolean = false;

    constructor(
        // obrigatórios para o modal        
        ngbModalConfig: NgbModalConfig,
        private ngbModal: NgbModal,

        // minha regra de negócio    
        private toastr: ToastrService,
        private service: UnidadeService,
        private formBuilder: FormBuilder,
    ) {

        // obrigatórios para o modal
        ngbModalConfig.backdrop = 'static';
        ngbModalConfig.keyboard = false;
    }
    ngOnInit(): void {
        // this.iniciarformInclusao();
    }

    incluir(filaSelecionada: string) {
        console.log('incluir(filaSelecionada: string)');
        this.acaoDeAbrir = 'incluir';
        if (!this.formInclusao) {
            this.iniciarformInclusao();
        }
        this.idFila.setValue(filaSelecionada);
        this.open();
    }

    alterar(alcadaDesconto: AlcadaDesconto) {
        console.log('alterar');
        console.log(alcadaDesconto);
        this.acaoDeAbrir = 'alterar';
        if (!this.formInclusao) {
            this.iniciarformInclusao();
        }
        this.formInclusao.setValue(alcadaDesconto);
        console.log(this.formInclusao.value);
        this.open();
    }

    open() {
        // regra de negócio
        // obrigatórios para o modal
        console.log('clicou no open');
        let modal = null;
        this.ngbModalRef = this.ngbModal.open(
            this.content,
            { size: 'sm', windowClass: 'inclusionModal' });
        setTimeout(() => {
            modal = document.querySelector('.inclusionModal');
            modal.classList.remove('fade');
        }, 100);

        // avisa ao componente pai que clicou no open.
        // this.modalEvent.emit(CLICK_EVENT.OPEN);
    }


    //     this.atualizaDTO();
    //     if (this.acaoDeAbrir === 'incluir') {
    //       this.incluirAlcadaDescontoService();
    //     } else {
    //       this.atualizarAlcadaDescontoService();
    //     }
    //   }
    // }

    yes() {
        console.log('clicou no yes');
        // minha regra de negócio        
        if (this.descontoValido() && this.intervaloValido() && this.faixaComValoresValido()) {
            console.log('valido');
            console.log(this.formInclusao.value);

            this.atualizaDTO();

            (this.acaoDeAbrir === 'incluir') ? this.incluirAlcadaDescontoService() : this.atualizarAlcadaDescontoService();

            // if (this.responseSuccess) {
            //   this.formInclusao.reset();
            //   // obrigatórios para o modal
            //   this.ngbModalRef.close();
            //   this.modalEvent.emit(CLICK_EVENT.SUCCESS);
            // }
            // this.formInclusao.reset();

            // obrigatórios para o modal
            // this.ngbModalRef.close();
            // this.modalEvent.emit(CLICK_EVENT.SUCCESS);
        }
    }

    incluirAlcadaDescontoService() {
        this.service.salvarUnidade(this.alcadaDescontoDTO)
            .subscribe(response => {
                console.log(response);
                this.formInclusao.reset();
                this.ngbModalRef.close();
                this.modalEvent.emit(CLICK_EVENT.SUCCESS);
            })
    }

    atualizarAlcadaDescontoService() {
        this.service.atualizaUnidade(this.alcadaDescontoDTO)
            .subscribe(response => {
                console.log(response);
                this.responseSuccess = true;
                this.formInclusao.reset();
                this.ngbModalRef.close();
                this.modalEvent.emit(CLICK_EVENT.SUCCESS);
            })
    }

    no() {
        console.log('clicou no no');
        // obrigatórios para o modal
        this.ngbModalRef.dismiss();

        // minha regra de negócio
        this.formInclusao.reset();

        // avisa ao componente pai que clicou no no.
        this.modalEvent.emit(CLICK_EVENT.NO);
    }

    // open() {
    //   // regra de negócio    
    //   // this.idFila.setValue(this.filaSelecionada);
    //   // obrigatórios para o modal
    //   console.log('clicou no open');
    //   let modal = null;
    //   this.ngbModalRef = this.ngbModal.open(
    //     this.content,
    //     { size: 'sm', windowClass: 'inclusionModal' });
    //   setTimeout(() => {
    //     modal = document.querySelector('.inclusionModal');
    //     modal.classList.remove('fade');
    //   }, 100);
    //   // avisa ao componente pai que clicou no open.
    //   // this.modalEvent.emit(CLICK_EVENT.OPEN);
    // }

    // yes() {
    //   console.log('clicou no yes');
    //   // minha regra de negócio    
    //   if (this.descontoValido() && this.intervaloValido() && this.faixaComValoresValido()) {
    //     // obrigatórios para o modal
    //     this.ngbModalRef.close();
    //     this.atualizaDTO();
    //     if (this.acaoDeAbrir === 'incluir') {
    //       this.incluirAlcadaDescontoService();
    //     } else {
    //       this.atualizarAlcadaDescontoService();
    //     }
    //   }
    // }

    // incluirAlcadaDescontoService() {
    //   this.service.incluirAlcadaDesconto(this.alcadaDesconto)
    //     .subscribe(response => {
    //       console.log(response);
    //       this.formInclusao.reset();
    //       this.modalEvent.emit(CLICK_EVENT.SUCCESS);
    //     })
    // }

    // atualizarAlcadaDescontoService() {
    //   this.service.atualizarAlcadaDesconto(this.alcadaDesconto)
    //     .subscribe(response => {
    //       console.log(response);
    //       this.formInclusao.reset();
    //       this.modalEvent.emit(CLICK_EVENT.SUCCESS);
    //     })
    // }

    atualizaDTO(): void {
        this.alcadaDescontoDTO.fxInicio = (this.fxInicio.value) ? this.fxInicio.value : 0;
        this.alcadaDescontoDTO.fxFim = (this.fxFim.value) ? this.fxFim.value : 0;
        // this.alcadaDescontoDTO.inRent = (this.inRent.value) ? 'S' : 'N';
        this.alcadaDescontoDTO.idFila = this.idFila.value;
        this.alcadaDescontoDTO.vlPercDesc = this.vlPercDesc.value;
        // if (!this.fxInicio.value) {
        //   this.alcadaDescontoDTO.fxInicio = 0
        // }

        // if (!this.fxFim.value) {
        //   this.alcadaDescontoDTO.fxFim = 0;
        // }

        // if (this.inRent.value) {
        //   this.alcadaDescontoDTO.inRent = 'S';
        // } else {
        //   this.alcadaDescontoDTO.inRent = 'N';
        // }

        // if (!this.inRent.value) {
        //   this.alcadaDescontoDTO.inRent = 'N';
        // }

        // if (this.inRent.value) {
        //   this.alcadaDescontoDTO.inRent = 'S';
        // }
    }

    // no() {
    //   console.log('clicou no no');
    //   // obrigatórios para o modal
    //   this.ngbModalRef.dismiss();

    //   // minha regra de negócio
    //   this.formInclusao.reset();

    //   // avisa ao componente pai que clicou no no.
    //   this.modalEvent.emit(CLICK_EVENT.NO);
    // }

    descontoValido() {
        if (this.vlPercDesc.valid) {
            return true;
        } else {
            ToastrMensagemUtil.info(this.toastr, 'Desconto Inválido.');
            return false;
        }
    }

    intervaloValido(): boolean {
        if (Number(this.fxInicio.value) > Number(this.fxFim.value)) {
            ToastrMensagemUtil.info(this.toastr, 'Intervalo Inválido.');
            return false;
        } else {
            return true;
        }
    }

    faixaComValoresValido(): boolean {
        const listaFiltradaPorIdFila: Array<AlcadaDesconto> = this.listaAlcadaDesconto
            .filter(e => e.idFila === String(this.idFila.value));

        console.log(listaFiltradaPorIdFila);

        const minValueFxInicio = listaFiltradaPorIdFila
            .map(e => e.fxInicio).reduce((accumulator, currentValue) => Math.min(accumulator, currentValue));

        const maxValueFxFim = listaFiltradaPorIdFila
            .map(e => e.fxFim).reduce((accumulator, currentValue) => Math.max(accumulator, currentValue));

        if (this.fxInicio.value >= minValueFxInicio && this.fxInicio.value <= maxValueFxFim) {
            ToastrMensagemUtil.info(this.toastr, 'A faixa está sobreposta, já existe uma faixa configurada com estes valores.')
            return false;
        }

        if (this.fxFim.value >= minValueFxInicio && this.fxFim.value <= maxValueFxFim) {
            ToastrMensagemUtil.info(this.toastr, 'A faixa está sobreposta, já existe uma faixa configurada com estes valores.')
            return false;
        }
        return true;

    }

    iniciarformInclusao() {
        this.formInclusao = this.formBuilder.group({
            idFila: [null],
            fxInicio: [null],
            fxFim: [null],
            vlPercDesc: [null, [Validators.required]],
            inRent: [null]
        });
    }

    get idFila(): AbstractControl {
        return this.formInclusao.get('idFila');
    }

    get fxInicio(): AbstractControl {
        return this.formInclusao.get('fxInicio');
    }

    get fxFim(): AbstractControl {
        return this.formInclusao.get('fxFim');
    }

    get vlPercDesc(): AbstractControl {
        return this.formInclusao.get('vlPercDesc');
    }

    get inRent(): AbstractControl {
        return this.formInclusao.get('inRent');
    }

    validarNumero(evento: any): void {
        return FormUtil.validarNumero(evento);
    }

}


