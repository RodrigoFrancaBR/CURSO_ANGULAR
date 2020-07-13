import { UnidadeEditarComponent } from './../unidade-editar/unidade-editar.component';
import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() dadosDaGrid: Array<Unidade>;
  unidadeSelecionada: Unidade;
  ngbModalRef: NgbModalRef;
  constructor(
    private service: UnidadeService,
    private ngbModal: NgbModal,
    ngbModalConfig: NgbModalConfig,
  ) {
    // customize default values of modals used by this component tree
    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dadosDaGrid && this.dadosDaGrid.length > 0) {
      console.log(this.dadosDaGrid);
    }
  }

  // selecionarRegistro(unidade: Unidade): void {
  //   this.unidadeSelecionada = (this.unidadeSelecionada.id === unidade.id) ? null : unidade;
  // }

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

  open(content) {
    this.ngbModalRef = this.ngbModal.open(content, { size: 'sm' });
  }

  sim() {
    console.log('clicou no sim');
    this.ngbModalRef.close();
    this.unidadeSelecionada.status = 'INATIVO';
    this.service.atualizaUnidade(this.unidadeSelecionada).subscribe(resp => {
      console.log(resp);
    });

  }
  nao() {
    console.log('clicou no não');
    this.ngbModalRef.dismiss();
    console.log('dismiss acionado');
  }


}

