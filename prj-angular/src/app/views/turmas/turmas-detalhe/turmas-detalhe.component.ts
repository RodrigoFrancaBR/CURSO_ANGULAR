import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Turma } from 'src/app/model/turma';
import { FormUtil } from 'src/app/util/form-util';
import { TurmasService } from '../turmas.service';
import { Unidade } from 'src/app/model/unidade';

@Component({
  selector: 'app-turmas-detalhe',
  templateUrl: './turmas-detalhe.component.html',
  styleUrls: ['./turmas-detalhe.component.css']
})
export class TurmasDetalheComponent implements OnInit {

  formularioDetalhe: FormGroup;
  turma: Turma;
  listaDeUnidades: Array<Unidade> = [];
  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];

  inscricao: Subscription;
  submitName: string = '';
  cancelName: string = 'Cancelar';
  path: string = "";

  mostrarBotaoSubmit: boolean = false;
  mostrarBotaoCancel: boolean = false;
  mostrarBotaoEditar: boolean;
  mostrarBotaoDesativar: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: TurmasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.turma = new Turma();
    this.turma = this.router.getCurrentNavigation().extras.state.turma;
  }

  ngOnInit() {
    this.bustarTodasUnidades();
    this.obterPath();
    this.verificarPath();
  }

  bustarTodasUnidades() {
    // loiane
    // this.inscricao = this.activatedRoute.data.subscribe(resolve => this.listaDeUnidades = resolve.listaDeUnidades);

    // flavio
    this.listaDeUnidades = this.activatedRoute.snapshot.data.listaDeUnidades;

    // sem resolver
    // this.inscricao = this.unidadeService.bustarTodasUnidades()
    //   .subscribe(listaDeUnidades => this.listaDeUnidades = listaDeUnidades);

  }

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
          this.turma
        );

        this.id.disable();

        this.status.patchValue('ATIVA');
        this.status.disable()
        this.unidadeId.patchValue('');

        break;

      case 'detalhe':

        this.formularioDetalhe = this.formBuilder.group(
          this.turma
        );

        this.submitName = 'Atualizar'
        this.cancelName = 'Voltar'

        this.mostrarBotaoEditar = true;
        this.mostrarBotaoDesativar = true;
        this.mostrarBotaoCancel = true;

        this.mostrarBotaoSubmit = false;

        // this.formularioDetalhe.setValue(this.turma);
        this.formularioDetalhe.disable();

        // let idSelecionado = this.obterParametroDaRota();

        // if (idSelecionado) {
        //   this.buscarTurmaPorId(idSelecionado)
        // }

        break;
    }
  }

  // private obterParametroDaRota(): number {
  //   let idSelecionado;

  //   idSelecionado = this.activatedRoute.snapshot.params.id;
  //   let turma = this.activatedRoute.snapshot.queryParams.turma
  //   console.log(turma);

  //   // this.inscricao = this.activatedRoute.params
  //   //   .subscribe(params => idSelecionado = params.id);

  //   return idSelecionado;
  // }

  // private buscarTurmaPorId(id: number) {
  //   this.service.buscarTurmaPorId(id)
  //     .subscribe((turmaDTO: TurmaDTO) => {
  //       this.formularioDetalhe.setValue(turmaDTO);
  //       this.formularioDetalhe.disable();
  //     })
  // }

  submit() {    
    switch (this.submitName) {
      case 'Atualizar':
        if (this.formularioValido()) {
          this.openModal('Gostaria de atualizar os dados da turma?')
            .then(() => {
              //clicou no confirm
              this.atualizarTurma();
            }, () => {
              // clicou no cancel ou no x 
            });
        }

        break;

      case 'Salvar':
        if (this.formularioValido()) {
          this.openModal('Gostaria de salvar os dados da turma?')
            .then(() => {
              //clicou no confirm
              this.salvarTurma();
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

  atualizarTurma() {
    this.service.atualizarTurma(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['turmas']); });
  }

  salvarTurma() {
    this.service.salvarTurma(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['turmas']); });
  }


  editar() {
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
    this.openModal('Gostaria de desativar a turma?')
      .then(() => {
        //clicou no confirm     
        this.desativarTurma();
      }, () => {
        // clicou no cancel ou no x 
      });
  }

  cancel() {
    switch (this.cancelName) {
      case 'Voltar':
        this.router.navigate(['turmas', this.id.value]);
        break;

      case 'Cancelar':
        this.router.navigate(['turmas']);
        break;
    }

  }

  desativarTurma() {
    this.service.excluirTurma(this.id.value)
      .subscribe(() => {
        this.status.patchValue('DESATIVADA')
        this.router.navigate(['turmas']);
      });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  get id(): AbstractControl { return this.formularioDetalhe.get('id'); }

  get nome(): AbstractControl { return this.formularioDetalhe.get('nome'); }

  get status(): AbstractControl { return this.formularioDetalhe.get('status'); }

  get unidadeId(): AbstractControl { return this.formularioDetalhe.get('unidadeId'); }

}
