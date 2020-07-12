import { UnidadeEditarComponent } from './../unidade-editar/unidade-editar.component';
import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  unidadeForm: FormGroup;
  listaDeUnidades: Unidade[] = [];
  unidadeSelecionada: number;
  temSelecionado: boolean;
  // unidadeSelecionada: number;
  constructor(
    private service: UnidadeService,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    config: NgbModalConfig
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.iniciarFormulario();
    // this.carregarDadosDaGrid();
  }

  iniciarFormulario() {
    this.unidadeForm = this.formBuilder.group({
      id: [null]
    });
  }

  get id(): AbstractControl {
    return this.unidadeForm.get('id');
  }

  pesquisar() {
    console.log(this.id.value);
    this.service.buscarUnidadePorId(this.id.value).subscribe(resp => {
      this.listaDeUnidades.push(resp);
    });
  }

  // carregarDadosDaGrid() {
  //   this.service.obterUnidades().subscribe((res) => {
  //     console.log(res);
  //     this.listaDeUnidades = res;
  //   });
  // }

  selecionarRegistro(unidade: Unidade): void {
    this.unidadeSelecionada = (this.unidadeSelecionada === unidade.id) ? null : unidade.id;

    // if (this.unidadeSelecionada === unidade.id) {
    //   this.unidadeSelecionada = null;
    // } else {
    //   this.unidadeSelecionada = unidade.id;
    // }
  }

  estaSelecionadoRegistro(unidade: Unidade): boolean {
    return (this.unidadeSelecionada === unidade.id) ? true : false;
    // if (this.unidadeSelecionada === unidade.id) {
    //   return true;
    // } else {
    //   return false;
    // }

  }

  open(content) {
    this.modal.open(content, { size: 'sm' });
  }



}

