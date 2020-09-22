import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Unidade } from 'src/app/model/unidade';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { FormUtil } from 'src/app/util/form-util';
import { UnidadesService } from '../unidades.service';


@Component({
  selector: 'app-unidade-novo',
  templateUrl: './unidades-novo.component.html',
  styleUrls: ['./unidades-novo.component.css']
})
export class UnidadesNovoComponent implements OnInit {
  formularioNovo: FormGroup;
  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private service: UnidadesService,
    private router: Router) { }

  ngOnInit() {
    this.configurarFormulario(new Unidade());
  }

  private configurarFormulario(unidade: Unidade): void {
    this.formularioNovo = this.formBuilder.group(
      unidade
    );
    this.nome.setValidators([Validators.required, Validators.maxLength(20)])
    this.endereco.setValidators([Validators.required, Validators.maxLength(60)])
    this.status.setValidators([Validators.required])
  }

  get nome(): AbstractControl {
    return this.formularioNovo.get('nome');
  }

  get endereco(): AbstractControl {
    return this.formularioNovo.get('endereco');
  }

  get status(): AbstractControl {
    return this.formularioNovo.get('status');
  }

  salvar() {
    if (this.formularioValido()) {

      this.openModal()
        .then(() => {
          //clicou no confirm
          this.salvarUnidade();
        }, () => {
          // clicou no cancel ou no x 
        });
    }
  }

  openModal(): Promise<any> {
    const ngbModalRef = this.modalService.open(
      ModalConfirmacaoComponent,
      {
        size: 'sm',
      });
    ngbModalRef.componentInstance.body = 'Gostaria de incluir a unidade? ';
    return ngbModalRef.result;    
  }

  salvarUnidade() {
    this.service.salvarUnidade(this.formularioNovo.value)
      .subscribe(() => { this.router.navigate(['unidades']); });
  }

  mostrarErro(controlName: string) {
    return FormUtil.mostrarErro(this.formularioNovo, controlName);
  }

  private formularioValido(): boolean {
    if (this.formularioNovo.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formularioNovo);
      return false;
    } else {
      return true;
    }
  }

  cancelar() {
    this.router.navigate(['unidades',]);
  }

}
