import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANTES } from './../../../shared/const/constantes';
import { ICanDeactivate } from './../../../guards/ican-deactivate';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { FormUtil } from 'src/app/util/form-util';
import { AlunosService } from '../alunos.service';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Estado } from 'src/app/shared/interfaces/estados.interface';
import { ChaveValorDTO } from 'src/app/shared/interfaces/chave-valor-dto.interface';


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
  buttonSubmit: string='';


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
        nome: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        status: [null, [Validators.required]],
        sexo: ['f', [Validators.required]],
        // valida se o check é true;
        condicao: [false, Validators.pattern('true')],
        endereco: this.formBuilder.group({
          cep: [null, [Validators.required]],
          numero: [null, [Validators.required]],
          complemento: [null],
          rua: [null, [Validators.required]],
          bairro: [null, [Validators.required]],
          cidade: [null,[Validators.required]],
          estado: [null]
        }),
        listaDeTurmas: this.buildTurmas()
      }
    );
  }

  buildTurmas(): FormArray {
    // para cada turma um novo controle com value false.
    let checks = this.listaDeTurmas.map(t => new FormControl(false));
    return this.formBuilder.array(checks);
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
        if (this.formularioValido()) {
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
        if (this.formularioValido()) {
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
  

}

