import { UnidadesService } from './../unidades.service';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { FormUtil } from './../../../util/form-util';
import { Unidade } from 'src/app/model/unidade';
import { distinctUntilChanged } from 'rxjs/operators';


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
    private service: UnidadesService,
  ) { }

  ngOnInit() {
    this.configurarFormulario(new Unidade());
    this.id.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((valor: string) => {
        let valorAnterio = '';
        console.log(valor);
        let resultado = FormUtil.converterStringParaNumber(valor);
        if (!resultado) {

          this.id.setValue('');
        }
      });
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
      this.idDaPesquisa.emit(this.id.value);
      // this.service.emitirFiltro.emit(this.id.value);
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
