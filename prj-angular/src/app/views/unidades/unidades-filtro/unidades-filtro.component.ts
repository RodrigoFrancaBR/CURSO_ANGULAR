import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { FormUtil } from './../../../util/form-util';
import { Unidade } from 'src/app/model/unidade';


@Component({
  selector: 'app-unidades-filtro',
  templateUrl: './unidades-filtro.component.html',
  styleUrls: ['./unidades-filtro.component.css']
})
export class UnidadesFiltroComponent implements OnInit {

  @Output()
  idDaPesquisa = new EventEmitter();

  @Output()
  eventoDeLimpar = new EventEmitter();

  @Input()
  idSelecionado: number;

  formularioPesquisa: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.configurarFormulario(new Unidade());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.idSelecionado && this.idSelecionado) {
      this.id.setValue(this.idSelecionado);
    }
  }

  configurarFormulario(unidade: Unidade) {
    this.formularioPesquisa = this.formBuilder.group(
      unidade
    );
    this.id.setValidators([
      FormUtil.valorMinimo(),
    ]);
  }

  get id(): AbstractControl {
    return this.formularioPesquisa.get('id');
  }

  limpar(): void {
    this.formularioPesquisa.reset();
    this.eventoDeLimpar.emit(null);
  }

  pesquisar() {
    if (this.formularioValido()) {
      this.idDaPesquisa.emit(this.id.value)
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

  validaNumero(event: any) {
    FormUtil.validaNumero(event);
  }

}
