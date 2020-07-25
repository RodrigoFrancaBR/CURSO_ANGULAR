import { Subject } from 'rxjs';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormUtil } from 'src/app/util/form-util';
import { ModalConfirmacaoComponent } from 'src/app/util/modal-confirmacao';


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
  // @ViewChild('modalConfirmacaoComponent', { static: false }) content: ModalConfirmacaoComponent;
  @ViewChild(ModalConfirmacaoComponent, { static: false }) private modalConfirmacaoComponent: ModalConfirmacaoComponent;

  // @ViewChild('baseChart')chart: BaseChartDirective;

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
    this.formulario = this.formBuilder.group(new Unidade());
    this.getId().setValidators([Validators.required, FormUtil.valorMinimo()]);
  }

  getId(): AbstractControl {
    return this.formulario.get('id');
  }

  get id(): number {
    return Number(this.getId().value);
  }

  pesquisar() {
    console.log('Valor da variavel já convertido: ' + this.id);
    console.log('Devolve o controle do formulário');
    console.log(this.getId());
    console.log('Valor da variavel sem conversao: ' + this.id);
    console.log(this.getId().value);
    console.log(this.formulario);

    if (this.formularioValido()) {
      this.service.buscarUnidadePorId(this.id).subscribe(response => {
        console.log(response);
        this.listaDeUnidades = [];
        this.listaDeUnidades.push(response);
        this.unidadeSelecionada = null;
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

  forcarCancelamento() {
    if (this.unidadeSelecionada) {
      this.modalConfirmacaoComponent.open();
      // this.abrirModal()
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
        this.unidadeSelecionada = null;
      }
    });

  }

  nao() {
    this.ngbModalRef.dismiss();
  }

  alterar(unidade: Unidade) {
    console.log(unidade);
  }

  excluir(unidade: Unidade) {
    console.log(unidade);
  }

}

