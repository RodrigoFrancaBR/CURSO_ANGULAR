import { Oferta } from './../model/oferta';
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
        <label for="obid"  class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'OFERTA' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="obid" type="text" readonly class="text-secondary" formControlName="obid">
        </div>
      </div>

      <div class="form-group row">
        <label for="obDescricao" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'DESCRICAO' }}</strong>
        </label>
        <div class="col-sm-7">
          <input id="obDescricao" type="text" class="text-secondary col-sm-12" formControlName="obDescricao" maxlength="50">
        </div>
      </div>

      <div class="form-group row">
        <label for="obIniVig" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'VIGENCIA_INICIO' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="obIniVig" type="date" class="text-secondary" formControlName="obIniVig" >
        </div>
      </div>

      <div class="form-group row">
        <label for="obFimVig" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'VIGENCIA_FIM' }}</strong>
        </label>
        <div class="col-sm-2">
          <input id="obFimVig" type="date" class="text-secondary" formControlName="obFimVig">
        </div>
      </div>

      <div class="form-group row">
        <label for="obLimite" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'LIMITE_OFERTA' }}</strong>
        </label>
        <div class="col-sm-1">
          <input id="obLimite" type="text" formControlName="obLimite"
                class="col-sm-1 col-form-label" maxlength="3"(keypress)="validarNumero($event)">
        </div>
      </div>

      <div class="form-group row">
        <label for="oblIntavalo" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'INTERVALO_OFERTAS' }}</strong>
        </label>
        <div class="col-sm-1">
          <input id="oblIntavalo" type="text" formControlName="oblIntavalo"
                class="col-sm-1 col-form-label" maxlength="3"(keypress)="validarNumero($event)">
        </div>
      </div>

      <div class="form-group row">
        <label for="obQtdDiaBol" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'QTD_DIAS_VENCIMENTO' }}</strong>
        </label>
        <div class="col-sm-1">
          <input id="obQtdDiaBol" type="text" formControlName="obQtdDiaBol" 
                class="col-sm-1 col-form-label"maxlength="3"(keypress)="validarNumero($event)">
        </div>
      </div>

      <div class="form-group row">
        <label for="obQtdDiaGraca" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'QTD_DIAS_GRACA'  }}</strong>
        </label>
        <div class="col-sm-1">
          <input id="obQtdDiaGraca" type="text" formControlName="obQtdDiaGraca"
          class="col-sm-1 col-form-label" maxlength="2" (keypress)="validarNumero($event)">
        </div>
      </div>

      <div class="form-group row">
        <label for="obTipo" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'TIPO_OFERTA'  }}</strong>
        </label>
        <div class="col-sm-7">
          <select id="obTipo" type="text" formControlName="obTipo" title="Selecione uma oferta">
            <option *ngFor="let obTipo of comboDeOferta" [ngValue]="obTipo">{{obTipo}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="obTipoAcordo" class="col-sm-5 col-form-label text-right">
          <strong class="text-secondary">{{ 'TIPO_ACORDO'  }}</strong>
        </label>
        <div class="col-sm-7">
          <select id="obTipoAcordo" type="text" formControlName="obTipoAcordo" title="Selecione uma oferta">
            <option *ngFor="let obTipoAcordo of comboDeAcordo" [ngValue]="obTipoAcordo">{{obTipoAcordo}}</option>
          </select>
        </div>
      </div>

    </form>

  </div>

     
  <div class="modal-footer">
    <div class="col-sm-12 ">
      <div class="col-sm-5 text-right">
        <button type="button" class="btn-sm btn-danger" (click)="yes()">Salvar</button>
      </div>
      <div class="col-sm-5 text-left">
        <button class="btn-sm btn-secondary" type="button" (click)="no()">Sair</button>
      </div>
    </div>
  </div>
  </ng-template>

  `,
})


export class ModalInclusionComponent {
    // obrigatórios para o modal

    @ViewChild('content', { static: false }) content: any;
    @Output() modalEvent = new EventEmitter();
    ngbModalRef: NgbModalRef;

    // minha regra de negócio
    formInclusao: FormGroup;
    acaoDeAbrir: string;
    alcadaDescontoDTO: AlcadaDesconto = new AlcadaDesconto();
    filaSelecionado: string;
    comboDeOferta: Array<string> = ['Oferta1', 'oferta2', 'oferta3'];
    comboDeAcordo: Array<string> = ['acordo1', 'acordo2', 'acordo3'];
    listaDeFilas: Array<any> = [
        {
            'id': 1,
            'nome': 'fila1'
        },
        {
            'id': 2,
            'nome': 'fila1'
        },
        {
            'id': 3,
            'nome': 'fila1'
        }
    ];

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

    open() {
        console.log('clicou no open');
        this.iniciarformInclusao();
        let modal = null;
        this.ngbModalRef = this.ngbModal.open(
            this.content,
            { size: 'lg', windowClass: 'inclusionModal' });
        setTimeout(() => {
            modal = document.querySelector('.inclusionModal');
            modal.classList.remove('fade');
        }, 100);
    }

    yes() {
        console.log('clicou no yes');
        this.ngbModalRef.close();
    }

    no() {
        console.log('clicou no no');
        this.ngbModalRef.dismiss();
        this.formInclusao.reset();
    }

    iniciarformInclusao() {
        this.formInclusao = this.formBuilder.group(
            new Oferta()
        );
    }

    validarNumero(evento: any): void {
        return FormUtil.validarNumero(evento);
    }

    public getObid(): AbstractControl {
        return this.formInclusao.get('obid');
    }

    public getObDescricao(): AbstractControl {
        return this.formInclusao.get('obDescricao');
    }

    public getObIniVig(): AbstractControl {
        return this.formInclusao.get('obIniVig');
    }

    public getObFimVig(): AbstractControl {
        return this.formInclusao.get('obFimVig');
    }

    public getObLimite(): AbstractControl {
        return this.formInclusao.get('obLimite');
    }

    public getOblIntavalo(): AbstractControl {
        return this.formInclusao.get('oblIntavalo');
    }

    public getObQtdDiaBol(): AbstractControl {
        return this.formInclusao.get('obQtdDiaBol');
    }

    public getObQtdDiaGraca(): AbstractControl {
        return this.formInclusao.get('obQtdDiaGraca');
    }

    public getObTipo(): AbstractControl {
        return this.formInclusao.get('obTipo');
    }

    public getObTipoAcordo(): AbstractControl {
        return this.formInclusao.get('obTipoAcordo');
    }

    // public getFilas(): AbstractControl {
    //   return this.formInclusao.get('filas');
    // }

    public get obid(): number {
        return this.getObid().value;
    }

    public get obDescricao(): string {
        return this.getObDescricao().value;
    }

    public get obIniVig(): string {
        return this.getObIniVig().value;
    }

    public get obFimVig(): string {
        return this.getObFimVig().value;
    }

    public get obLimite(): number {
        return this.getObLimite().value;
    }

    public get oblIntavalo(): number {
        return this.getOblIntavalo().value;
    }

    public get obQtdDiaBol(): number {
        return this.getObQtdDiaBol().value;
    }

    public get obQtdDiaGraca(): number {
        return this.getObQtdDiaGraca().value;
    }

    public get obTipo(): number {
        return this.getObTipo().value;
    }

    public get obTipoAcordo(): string {
        return this.getObTipoAcordo().value;
    }

    // public get filas(): Array<string> {
    //   return this.getFilas().value;
    // }

}


