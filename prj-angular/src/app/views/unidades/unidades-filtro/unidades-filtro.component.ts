import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { FormUtil } from './../../../util/form-util';
import { Unidade } from 'src/app/model/unidade';


@Component({
  selector: 'app-unidades-filtro',
  templateUrl: './unidades-filtro.component.html',
  styleUrls: ['./unidades-filtro.component.css']
})
export class UnidadesFiltroComponent implements OnInit {

  formularioDePesquisa: FormGroup;
  valorDaPesquisaEvent = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formularioDePesquisa = this.formBuilder.group(
      new Unidade()
    );
    this.id.setValidators([FormUtil.valorMinimo()]);
  }

  get id(): AbstractControl {
    return this.formularioDePesquisa.get('id');
  }

  limpar(): void {
    this.formularioDePesquisa.reset();
   // this.valorDaPesquisaEvent.emit(null);
  }

  pesquisar() {
    console.log(this.id);
    console.log(this.id.value);
    if (this.formularioValido()) {
      this.valorDaPesquisaEvent.emit(this.id.value);
    } else {
      console.log('form inválido')
    }
  }

  formularioValido() {
    if (this.formularioDePesquisa.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formularioDePesquisa);
      return false;
    } else {
      return true;
    }
  }

  mostrarErro(controlName: string): boolean {
    return FormUtil.mostrarErro(this.formularioDePesquisa, controlName);
  }


}
