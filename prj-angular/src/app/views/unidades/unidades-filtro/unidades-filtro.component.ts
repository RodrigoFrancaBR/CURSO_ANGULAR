import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { FormUtil } from './../../../util/form-util';
import { Unidade } from 'src/app/model/unidade';


@Component({
  selector: 'app-unidades-filtro',
  templateUrl: './unidades-filtro.component.html',
  styleUrls: ['./unidades-filtro.component.css']
})
export class UnidadesFiltroComponent implements OnInit {

  @Output()
  valorDaPesquisa = new EventEmitter();

  formularioPesquisa: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {    
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formularioPesquisa = this.formBuilder.group(
      new Unidade()
    );
    this.id.setValidators([FormUtil.valorMinimo()]);
  }

  get id(): AbstractControl {
    return this.formularioPesquisa.get('id');
  }

  limpar(): void {
    this.formularioPesquisa.reset();
    this.valorDaPesquisa.emit(null);
  }

  pesquisar() {
    if (this.formularioValido()) {
      this.valorDaPesquisa.emit(this.id.value);
    }
  }

  formularioValido() {
    if (this.formularioPesquisa.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formularioPesquisa);
      return false;
    } else {
      return true;
    }
  }

  mostrarErro(controlName: string): boolean {
    return FormUtil.mostrarErro(this.formularioPesquisa, controlName);
  }

}
