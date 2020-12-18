import { TurmaDTO } from './../../../interfaces/tudma.dto';
import { UnidadesService } from './../../unidades/unidades.service';
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
  inscricao: Subscription;
  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];
  submitName: string = '';
  cancelName: string = 'Cancelar';
  turma: Turma;
  path: string = "";
  mostrarBotaoSubmit: boolean = false;
  mostrarBotaoCancel: boolean = false;
  mostrarBotaoEditar: boolean;
  mostrarBotaoDesativar: boolean;
  listaDeUnidades: Array<Unidade> = [];
  unidade: Unidade;

  constructor(
    private unidadeService: UnidadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: TurmasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal

  ) {
    console.log('construtor da classe');
  }


  ngOnInit() {
    console.log('onInit')
    console.log(this.router);
    console.log(this.activatedRoute);
    this.turma = new Turma();
    // this.unidade = new Unidade();
    this.bustarTodasUnidades();
    this.obterPath();
    this.verificarPath();

  }

  bustarTodasUnidades() {
    this.inscricao = this.unidadeService.bustarTodasUnidades().subscribe(listaDeUnidades => this.listaDeUnidades = listaDeUnidades);
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
        //this.bustarTodasUnidades();
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
        this.status.disable();
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

        let idSelecionado = this.obterParametroDaRota();

        if (idSelecionado) {
          this.buscarTurmaPorId(idSelecionado)
          // this.buscarUnidadePorId()
        }
        break;
    }
  }

  private obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params.subscribe(params => idSelecionado = params.id);
    return idSelecionado;
  }

  private buscarTurmaPorId(id: number) {
    this.service.buscarTurmaPorId(id)
      .subscribe((turmaDTO: TurmaDTO) => {        
        this.formularioDetalhe.setValue(turmaDTO);        
        this.formularioDetalhe.disable();
      })
  }

  submit() {
    console.log(this.formularioDetalhe.value);
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

  verificarAcao() {
    switch (this.path) {
      case 'novo':
        this.salvarTurma();
        break;

      default:
        break;
    }
  }

  salvarTurma() {
    this.service.salvarTurma(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['turmas']); });
  }

  cancel() {
    this.router.navigate(['turmas',]);
  }



  private formularioValido(): boolean {
    if (this.formularioDetalhe.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formularioDetalhe);
      return false;
    } else {
      return true;
    }
  }

  atualizarTurma() {
    this.service.atualizarTurma(this.formularioDetalhe.getRawValue())
      .subscribe(() => { this.router.navigate(['turmas']); });
  }

  desativar() {
    this.openModal('')
      .then(() => {
        //clicou no confirm     
        this.desativarTurma();
      }, () => {
        // clicou no cancel ou no x 
      });
  }

  voltar() {
    this.router.navigate(['turmas', this.formularioDetalhe.get('id').value]);
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

  desativarTurma() {
    this.service.excluirTurma(this.formularioDetalhe.get('id').value)
      .subscribe(() => this.status.patchValue('DESATIVADA'));
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  desabilitar() {
    return this.formularioDetalhe.get('status').value === 'DESATIVADA' ? true : false
  }


  get id(): AbstractControl { return this.formularioDetalhe.get('id'); }

  get nome(): AbstractControl { return this.formularioDetalhe.get('nome'); }

  get status(): AbstractControl { return this.formularioDetalhe.get('status'); }
  
  get unidadeId(): AbstractControl { return this.formularioDetalhe.get('unidadeId'); }

  mostrarBotao(nomeDoButao: string): boolean {

    let mostrarBotao: boolean = false;

    switch (nomeDoButao) {
      case 'editar':
        mostrarBotao = this.path === 'detalhe' ? true : false;
        break;
      case 'desativar':
        mostrarBotao = this.path === 'detalhe' ? true : false;
        break;

      case 'submit':
        mostrarBotao = this.path === 'novo' ? true : false;
        break;

      default:
        break;
    }
    return mostrarBotao;
    // return this.path === 'detalhe' && (nomeDoButao === 'editar') || (nomeDoButao === 'desativar') ? true : false;
  }

  editar() {
    this.nome.enable();
    this.status.enable();
    this.mostrarBotaoSubmit = true;
    this.mostrarBotaoDesativar = false;
    this.mostrarBotaoEditar = false;
  }

}
