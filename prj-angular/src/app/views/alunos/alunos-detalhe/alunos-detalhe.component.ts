import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANTES } from './../../../shared/const/constantes';
import { FormValidations } from './../../../shared/util/form-validations';
import { ICanDeactivate } from './../../../guards/ican-deactivate';
// import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { FormUtil } from 'src/app/util/form-util';
import { AlunosService } from '../alunos.service';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Estado } from 'src/app/shared/interfaces/estados.interface';
import { ChaveValorDTO } from 'src/app/shared/interfaces/chave-valor-dto.interface';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal/modal-confirmacao/modal-confirmacao.component';


@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.css']
})
export class AlunosDetalheComponent implements OnInit, ICanDeactivate {
  formulario: FormGroup;

  estados: Observable<Array<Estado>>
  sexos: Array<ChaveValorDTO>;
  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];
  listaDeTurmas: Array<any> = ['1000', '2000', '3000'];
  openType: string;
  id: string;
  buttonSubmit: string = '';


  constructor(
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AlunosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.sexos = this.dropdownService.getSexo();
    this.estados = this.dropdownService.getEstadosBr();

    this.openType = this.activatedRoute.snapshot.paramMap.get('openType')
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.verificarOpenType();
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group(
      {
        nome: [null, [Validators.required, Validators.maxLength(30)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(30), FormValidations.notEquals('confEmail')]],
        confEmail: [null, [Validators.required, Validators.email, Validators.maxLength(30), FormValidations.notEquals('email')]],
        status: [null, Validators.required],
        sexo: [null, Validators.required],
        // valida se o check é true;
        condicao: [false, Validators.pattern('true')],
        endereco: this.formBuilder.group({
          cep: [null, [Validators.required, FormValidations.cepValidator]],
          numero: [null, [Validators.required, Validators.maxLength(5)]],
          complemento: [null, Validators.maxLength(30)],
          rua: [null, [Validators.required, Validators.maxLength(30)]],
          bairro: [null, [Validators.required, Validators.maxLength(30)]],
          cidade: [null, [Validators.required, Validators.maxLength(30)]],
          estado: [null]
        }),
        listaDeTurmas: this.buildTurmas()
      }
    );
  }

  buildTurmas(): FormArray {
    // para cada turma um novo controle com value false.
    let checks = this.listaDeTurmas.map(t => new FormControl(false));
    return this.formBuilder.array(checks, FormValidations.requiredMinCheckbox());
  }


  verificarOpenType() {

    switch (this.openType) {

      case CONSTANTES.OPEN_TYPE.CREATE:
        this.buttonSubmit = CONSTANTES.BUTTON_SUBMIT.SAVE;
        // this.iniciarFormulario();
        // this.status.patchValue('ATIVA');
        // this.status.disable()

        break;

      case CONSTANTES.OPEN_TYPE.CHANGE:
        console.log('change')
        break;
    }
  }

  submit() {
    console.log(this.formulario.value);
    // switch (this.submitName) {
    switch (this.openType) {
      case CONSTANTES.OPEN_TYPE.CREATE:

        if (this.formulario.valid) {
          this.openModal('Gostaria de salvar os dados do Aluno?')
            .then(() => {
              //clicou no confirm
              this.salvarAluno();
            }, () => {
              // clicou no cancel ou no x 
            });
        }

        break;

      case 'novo':
        if (this.formulario.valid) {
          this.openModal('Gostaria de salvar os dados do Aluno?')
            .then(() => {
              //clicou no confirm
              this.salvarAluno();
            }, () => {
              // clicou no cancel ou no x 
            });
        }

        break;

    }
  }

  formularioValido(): boolean {
    if (this.formulario.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formulario);
      return false;
    } else {
      return true;
    }
  }

  openModal(body: string): Promise<any> {
    const ngbModalRef = this.modalService.open(
      ModalConfirmacaoComponent,
      {
        size: 'sm',
      });
    ngbModalRef.componentInstance.body = body;
    return ngbModalRef.result;
  }

  salvarAluno() {
    console.log('salvando');
    this.service.salvarAluno(this.formulario.getRawValue())
      .subscribe(() => { this.router.navigate(['alunos']); });
  }

  atualizarAluno() {
    console.log('atualizando');
    this.service.atualizarAluno(this.formulario.getRawValue())
      .subscribe(() => { this.router.navigate(['alunos']); });
  }

  desativar() {
    this.openModal('Gostaria de desativar a Aluno?')
      .then(() => {
        //clicou no confirm     
        this.desativarAluno();
      }, () => {
        // clicou no cancel ou no x 
      });
  }

  cancel() {
    this.router.navigate(['alunos']);
  }

  desativarAluno() {
    //this.service.excluirAluno(this.id.value)
    this.service.excluirAluno(null)
      .subscribe(() => {
        // this.status.patchValue('DESATIVADA')
        this.router.navigate(['alunos']);
      });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  compararEstados(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }


  ngOnDestroy() {
  }

  async podeDesativar() {
    let resultado: boolean = true;
    if (this.formulario.dirty) {
      let resultado = this.openModal('Tem certeza que deseja sair dessa página?');
      return await resultado;
    }
    return resultado;
  }

  // usado pelo AlunoDeactivateGuard
  async podeMudarRota() {
    let resultado: boolean = true;
    if (this.formulario.dirty) {
      let resultado = this.openModal('Tem certeza que deseja sair dessa página?');
      return await resultado;
    }
    return resultado;
  }

  mostrarErro(controlName: string) {
    return FormUtil.mostrarErro(this.formulario, controlName);
  }


  get nome(): AbstractControl { return this.formulario.get('nome'); }

  get email(): AbstractControl { return this.formulario.get('email'); }

  get confEmail(): AbstractControl { return this.formulario.get('confEmail'); }

  get sexo(): AbstractControl { return this.formulario.get('sexo'); }

  get status(): AbstractControl { return this.formulario.get('status'); }

  get turmas(): AbstractControl { return this.formulario.get('listaDeTurmas'); }

  get condicao(): AbstractControl { return this.formulario.get('condicao'); }

  get cep(): AbstractControl { return this.formulario.get('endereco.cep'); }

  get numero(): AbstractControl { return this.formulario.get('endereco.numero'); }

  get complemento(): AbstractControl { return this.formulario.get('endereco.complemento'); }

  get rua(): AbstractControl { return this.formulario.get('endereco.rua'); }

  get bairro(): AbstractControl { return this.formulario.get('endereco.bairro'); }

  get cidade(): AbstractControl { return this.formulario.get('endereco.cidade'); }

  get estado(): AbstractControl { return this.formulario.get('endereco.estado'); }

}

