import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UnidadeService } from './unidade.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Unidade } from 'src/app/model/unidade';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormUtil } from 'src/app/util/form-util';

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
      id: [null, [Validators.required]]
    });
  }

  get id(): AbstractControl {
    return this.unidadeForm.get('id');
  }

  pesquisar() {
    if (this.formularioValido) {
      this.service.buscarUnidadePorId(this.id.value).subscribe(resp => {
        console.log(resp);
        this.listaDeUnidades = [];
        this.listaDeUnidades.push(resp);
      });
    }

  }

  aplicarCSSErro(controlName: string) {
    return FormUtil.aplicarCSSErro(this.unidadeForm, controlName);
  }

  mostrarErro(controlName: string) {
    return FormUtil.mostrarErro(this.unidadeForm, controlName);
  }

  private formularioValido(): boolean {
    if (this.unidadeForm.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.unidadeForm);
      return false;
    } else {
      return true;
    }
  }


}
