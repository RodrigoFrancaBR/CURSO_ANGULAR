import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment, NavigationExtras } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICanDeactivate } from './../../../guards/ican-deactivate';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Aluno } from 'src/app/model/aluno';
import { Turma } from 'src/app/model/Turma';
import { FormUtil } from 'src/app/util/form-util';
import { AlunosService } from '../alunos.service';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Estado } from 'src/app/shared/interfaces/estados.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.css']
})
export class AlunosDetalheComponent implements OnInit, ICanDeactivate {

  //aluno: Aluno;
  estados: Observable<Array<Estado>>
  formulario: FormGroup

  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];

  path: string = "";
  listaDeTurmas: Array<Turma> = [];
  turma: Turma;

  constructor(
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AlunosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {

    // this.aluno = new Aluno();

    // this.formulario = this.formBuilder.group(
    //   this.aluno
    // );    

    // this.aluno = this.router.getCurrentNavigation().extras.state.aluno;
    // let nav: NavigationExtras = this.router.getCurrentNavigation().extras;
    // if (nav && nav.state && nav.state.aluno) {
    //   this.aluno;
    // }

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

  ngOnInit() {
    this.estados = this.dropdownService.getEstadosBr();
    this.obterPath();
    this.verificarPath();
  }

  obterPath() {

    let url: Array<UrlSegment> = this.activatedRoute.snapshot.url;

    // pegando o path novo
    this.path = url[0].path

    // pegando o path detalhe 
    if (url[1] && url[1].path) {
      this.path = url[1].path;
    }
  }

  verificarPath() {

    switch (this.path) {

      case 'novo':
        this.formulario = this.formBuilder.group({
          nome: [null],
          email: [null],
          status: [null],
          endereco: this.formBuilder.group({
            cep: [null],
            numero: [null],
            complemento: [null],
            rua: [null],
            bairro: [null],
            cidade: [null],
            estado: [null]
          }),
        });
        // this.id.disable();

        // this.status.patchValue('ATIVA');
        // this.status.disable()

        break;

      case 'detalhe':

        // this.formulario = this.formBuilder.group(
        //   this.aluno
        // );

        break;
    }
  }

  submit() {
    console.log(this.formulario.value);
    // switch (this.submitName) {
    switch (this.path) {
      case 'detalhe':
        if (this.formularioValido()) {
          this.openModal('Gostaria de atualizar os dados do Aluno?')
            .then(() => {
              //clicou no confirm
              this.atualizarAluno();
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

  atualizarAluno() {
    console.log('atualizando');
    this.service.atualizarAluno(this.formulario.getRawValue())
      .subscribe(() => { this.router.navigate(['alunos']); });
  }

  salvarAluno() {
    console.log('salvando');
    this.service.salvarAluno(this.formulario.getRawValue())
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

  // get id(): AbstractControl { return this.formulario.get('id'); }

  // get nome(): AbstractControl { return this.formulario.get('nome'); }

  // get email(): AbstractControl { return this.formulario.get('email'); }

  // get cep(): AbstractControl { return this.formulario.get('cep'); }

  // get numero(): AbstractControl { return this.formulario.get('numero'); }

  // get complemento(): AbstractControl { return this.formulario.get('complemento'); }

  // get rua(): AbstractControl { return this.formulario.get('rua'); }

  // get bairro(): AbstractControl { return this.formulario.get('bairro'); }

  // get cidade(): AbstractControl { return this.formulario.get('cidade'); }

  // get estado(): AbstractControl { return this.formulario.get('estado'); }

  // get status(): AbstractControl { return this.formulario.get('status'); }

  // get TurmaId(): AbstractControl { return this.formulario.get('TurmaId'); }

}

