import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() dadosDaGrid: Array<Unidade>;
  unidadeSelecionada: Unidade;
  ngbModalRef: NgbModalRef;

  constructor(
    private toastr: ToastrService,
    private service: UnidadeService,
    private ngbModal: NgbModal,
    ngbModalConfig: NgbModalConfig) {
    // customize default values of modals used by this component tree
    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
  }

  ngOnInit() {
  }

  selecionarRegistro(unidade: Unidade): void {
    if (this.eValidaUnidade(this.unidadeSelecionada)) {
      this.unidadeSelecionada = (this.unidadeSelecionada.id === unidade.id) ? null : unidade;
    } else {
      this.unidadeSelecionada = unidade;
    }
  }

  estaSelecionadoRegistro(unidade: Unidade): boolean {
    if (this.eValidaUnidade(this.unidadeSelecionada)) {
      return (this.unidadeSelecionada.id === unidade.id) ? true : false;
    } else {
      return false;
    }

  }

  eValidaUnidade(unidadeSelecionada: Unidade) {
    return (unidadeSelecionada) ? true : false;
  }

  forcarCancelamento(content) {
    if (this.unidadeSelecionada) {
      this.abrirModal(content);
    } else {
      ToastrMensagemUtil.info(this.toastr, 'É preciso selecionar um registro para forçar o cancelamento.');
    }
  }

  abrirModal(content) {
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
    this.service.atualizaUnidade(this.unidadeSelecionada).subscribe(resp => {
      if (resp) {
        ToastrMensagemUtil.success(this.toastr, 'Status alterado com sucesso');
        this.dadosDaGrid = [];
      }
    });

  }

  nao() {
    this.ngbModalRef.dismiss();
  }


}

