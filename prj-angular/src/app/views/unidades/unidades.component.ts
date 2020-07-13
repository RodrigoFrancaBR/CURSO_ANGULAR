import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UnidadeService } from './unidade.service';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Unidade } from 'src/app/model/unidade';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  unidadeForm: FormGroup;
  listaDeUnidades: Unidade[] = [];
  unidadeSelecionada: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: UnidadeService) {
  }

  ngOnInit() {
    this.iniciarFormulario();
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
      console.log(resp);
      this.listaDeUnidades.push(resp);
    });
  }
}
