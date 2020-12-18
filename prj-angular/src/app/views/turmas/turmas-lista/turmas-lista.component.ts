import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { TurmasService } from './../turmas.service';
import { Turma } from 'src/app/model/turma';
import { FormUtil } from 'src/app/util/form-util';



@Component({
  selector: 'app-turmas-lista',
  templateUrl: './turmas-lista.component.html',
  styleUrls: ['./turmas-lista.component.css']
})
export class TurmasListaComponent implements OnInit {
  inscricao: Subscription;
  formularioDetalhe: FormGroup;

  formularioPesquisa: FormGroup;
  listaDeTurmas: Array<Turma> = [];
  idSelecionado: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private service: TurmasService,
  ) { }

  ngOnInit() {

    let idSelecionado = this.obterParametroDaRota();

    if (idSelecionado) {
      // obtem a Turma na base de dados e atualiza o filtro e a grid
      this.service.buscarTurmaPorId(idSelecionado)
        .subscribe((turmaselecionada: Turma) => {
          this.atualizarFiltroEaLista(turmaselecionada);
        });

    } else {
      this.buscarTodasTurmas();
    }

    this.configurarFormulario();
  }

  obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params.subscribe((params) => {
      idSelecionado = params.id
    });
    return idSelecionado;
  }

  atualizarFiltroEaLista(turma: Turma) {
    this.idSelecionado = turma.id;
    this.listaDeTurmas.push(turma);
    this.id.patchValue(turma.id);
  }

  buscarTodasTurmas() {
    this.service.bustarTodasTurmas()
      .subscribe((listaDeTurmas: Array<Turma>) => {
        this.listaDeTurmas = listaDeTurmas;
      });
  }

  configurarFormulario() {
    this.formularioPesquisa = this.formBuilder.group(
      new Turma()
    );
    this.id.setValidators([
      FormUtil.valorMinimo(),
    ]);
  }

  novaTurma() {
    this.router.navigate(['turmas', 'novo']);
  }

  pesquisar() {
    if (this.formularioValido()) {
      console.log(this.id.value);
      this.listaDeTurmas = [];
      this.idSelecionado = null;
      if (this.id.value) {
        this.service.buscarTurmaPorId(this.id.value)
          .subscribe((turma: Turma) => {
            this.listaDeTurmas.push(turma);
          });
      } else {
        this.service.bustarTodasTurmas()
          .subscribe((listaDeTurmas: Array<Turma>) => {
            this.listaDeTurmas = listaDeTurmas;
          });
      }
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

  validaNumero(event: any) {
    FormUtil.validaNumero(event);
  }

  mostrarErro(controlName: string): boolean {
    return FormUtil.mostrarErro(this.formularioPesquisa, controlName);
  }

  limpar(): void {
    this.formularioPesquisa.reset();
    this.listaDeTurmas = [];
    this.idSelecionado = null;
  }

  estaSelecionadoRegistro(id: number): boolean {
    return (this.idSelecionado === id) ? true : false;
  }

  selecionarRegistro(id: number): void {
    this.idSelecionado = this.estaSelecionadoRegistro(id) ? null : id;
  }

  detalhes(id: number): void {
    this.router.navigate(['turmas', `${id}`, 'detalhe']);
  }

  desabilitar(status: string) {
    return status === 'DESATIVADA' ? true : false;
  }

  desativar(id: number) {
    this.openModal()
      .then(() => {
        //clicou no confirm     
        this.desativarTurma(id);
      }, () => {
        // clicou no cancel ou no x 
      });
  }

  openModal(): Promise<any> {
    const ngbModalRef = this.modalService.open(
      ModalConfirmacaoComponent,
      {
        size: 'sm',
      });
    ngbModalRef.componentInstance.body = 'Gostaria de desativar a Turma? ';
    return ngbModalRef.result;
  }

  desativarTurma(id: number) {
    this.service.excluirTurma(id)
      .subscribe(() => {
        this.service.bustarTodasTurmas()
          .subscribe((listaDeTurmas: Array<Turma>) => {
            this.listaDeTurmas = listaDeTurmas;
          })
      });
  }

  get id(): AbstractControl { return this.formularioPesquisa.get('id'); }

}
