import { ICanDeactivate } from './../../../guards/ican-deactivate';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Aluno } from 'src/app/model/aluno';
import { Turma } from 'src/app/model/Turma';
import { FormUtil } from 'src/app/util/form-util';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.css']
})
export class AlunosDetalheComponent implements OnInit, ICanDeactivate {

  @ViewChild('campoInput', null) campoInput: ElementRef;
  formularioDetalhe: FormGroup;
  inscricao: Subscription;

  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];
  submitName: string = '';
  cancelName: string = 'Cancelar';
  aluno: Aluno;
  path: string = "";
  mostrarBotaoSubmit: boolean = false;
  mostrarBotaoCancel: boolean = false;
  mostrarBotaoEditar: boolean;
  mostrarBotaoDesativar: boolean;
  listaDeTurmas: Array<Turma> = [];
  turma: Turma;

  constructor(
    // private turmaService: TurmasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AlunosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  async podeDesativar() {
    let resultado: boolean = true;
    if (this.formularioDetalhe.dirty) {
      let resultado = this.openModal('Tem certeza que deseja sair dessa página?');
      return await resultado;
    }
    return resultado;
  }

  // usado pelo AlunoDeactivateGuard
  async podeMudarRota() {
    let resultado: boolean = true;
    if (this.formularioDetalhe.dirty) {
      let resultado = this.openModal('Tem certeza que deseja sair dessa página?');
      return await resultado;
    }
    return resultado;
  }



  ngOnInit() {
    this.aluno = new Aluno();
    // this.bustarTodasTurmas();
    this.obterPath();
    this.verificarPath();

  }

  // bustarTodasTurmas() {
  //   this.inscricao = this.turmaService.bustarTodasTurmas()
  //     .subscribe(listaDeTurmas => this.listaDeTurmas = listaDeTurmas);
  // }

  obterPath() {
    this.inscricao = this.activatedRoute.url.subscribe(value => {
      // pegando o path novo
      this.path = value[0].path;
      // pegando o path detalhe 
      if (value[1] && value[1].path) {
        this.path = value[1].path;
      }
    });
  }

  verificarPath() {

    switch (this.path) {

      case 'novo':

        this.submitName = 'Salvar'
        this.cancelName = 'Cancelar'

        this.mostrarBotaoSubmit = true;
        this.mostrarBotaoCancel = true;

        this.mostrarBotaoDesativar = false;
        this.mostrarBotaoEditar = false;

        this.formularioDetalhe = this.formBuilder.group(
          this.aluno
        );

        this.id.disable();

        this.status.patchValue('ATIVA');
        this.status.disable()
        // this.TurmaId.patchValue('');

        break;

      case 'detalhe':

        this.formularioDetalhe = this.formBuilder.group(
          this.aluno
        );

        this.submitName = 'Atualizar'
        this.cancelName = 'Voltar'

        this.mostrarBotaoEditar = true;
        this.mostrarBotaoDesativar = true;
        this.mostrarBotaoCancel = true;

        this.mostrarBotaoSubmit = false;

        let idSelecionado = this.obterParametroDaRota();

        // if (idSelecionado) {
        //   this.buscarAlunoPorId(idSelecionado)
        // }
        break;
    }
  }

  private obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params
      .subscribe(params => idSelecionado = params.id);
    return idSelecionado;
  }

  private buscarAlunoPorId(id: number) {
    this.service.buscarAlunoPorId(id)
      .subscribe((aluno: Aluno) => {
        this.formularioDetalhe.setValue(new Aluno());
        this.formularioDetalhe.disable();
      })
  }

  submit() {
    console.log(this.formularioDetalhe.value);
    switch (this.submitName) {
      case 'Atualizar':
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

      case 'Salvar':
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
    if (this.formularioDetalhe.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formularioDetalhe);
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
    this.service.atualizarAluno(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['alunos']); });
  }

  salvarAluno() {
    this.service.salvarAluno(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['alunos']); });
  }


  editar() {
    console.log(this.campoInput);    
    
    // this.nome.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });

    this.nome.enable();
    this.status.enable();
    this.mostrarBotaoSubmit = true;
    this.mostrarBotaoDesativar = false;
    this.mostrarBotaoEditar = false;
  }

  desabilitar() {
    return this.formularioDetalhe.get('status').value === 'DESATIVADA' ? true : false
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
    switch (this.cancelName) {
      case 'Voltar':
        this.router.navigate(['alunos', this.id.value]);
        break;

      case 'Cancelar':
        this.router.navigate(['alunos']);
        break;
    }

  }

  desativarAluno() {
    this.service.excluirAluno(this.id.value)
      .subscribe(() => {
        this.status.patchValue('DESATIVADA')
        this.router.navigate(['alunos']);
      });
  }


  // async podeMudarRota() {
  //   let resultado: boolean = true;
  //   if (this.formularioDetalhe.dirty) {
  //     let resultado = this.openModal('Tem certeza que deseja sair dessa página?');
  //     return await resultado;
  //   }
  //   return resultado;
  // }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  get id(): AbstractControl { return this.formularioDetalhe.get('id'); }

  get nome(): AbstractControl { return this.formularioDetalhe.get('nome'); }

  get status(): AbstractControl { return this.formularioDetalhe.get('status'); }

  // get TurmaId(): AbstractControl { return this.formularioDetalhe.get('TurmaId'); }

}
