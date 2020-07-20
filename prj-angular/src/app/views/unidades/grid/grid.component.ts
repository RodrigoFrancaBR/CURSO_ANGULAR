import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit } from '@angular/core';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormUtil } from 'src/app/util/form-util';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  formulario: FormGroup;
  listaDeUnidades: Unidade[] = [];
  unidadeSelecionada: number;
  ngbModalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private service: UnidadeService,
    private toastr: ToastrService,
    private ngbModal: NgbModal,
    ngbModalConfig: NgbModalConfig) {

    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null, [Validators.required]]
    });
  }

  get id(): AbstractControl {
    return this.formulario.get('id');
  }

  pesquisar() {
    if (this.formularioValido()) {
      this.service.buscarUnidadePorId(this.id.value).subscribe(resp => {
        this.listaDeUnidades = [];
        this.listaDeUnidades.push(resp);
      });
    }
  }

  private formularioValido(): boolean {
    if (this.formulario.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formulario);
      return false;
    } else {
      return true;
    }
  }

  // aplicarCSSErro(controlName: string) {
  //   return FormUtil.aplicarCSSErro(this.formulario, controlName);
  // }

  mostrarErro(controlName: string) {
    return FormUtil.mostrarErro(this.formulario, controlName);
  }

  selecionarRegistro(unidade: Unidade): void {
    this.unidadeSelecionada = (this.unidadeSelecionada === unidade.id) ? null : unidade.id;
  }

  estaSelecionadoRegistro(unidade: Unidade): boolean {
    return (this.unidadeSelecionada === unidade.id) ? true : false;
  }

  forcarCancelamento(content) {
    if (this.unidadeSelecionada) {
      this.abrirModal(content)
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
    this.service.atualizaUnidade(this.unidadeSelecionada).subscribe(resp => {
      if (resp) {
        ToastrMensagemUtil.success(this.toastr, 'Status alterado com sucesso');
        this.listaDeUnidades = [];
      }
    });

  }

  nao() {
    this.ngbModalRef.dismiss();
  }


}

