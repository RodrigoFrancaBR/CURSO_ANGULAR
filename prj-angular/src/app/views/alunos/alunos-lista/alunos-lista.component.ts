import { CONSTANTES } from './../../../shared/const/constantes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Aluno } from 'src/app/model/aluno';
import { FormUtil } from 'src/app/util/form-util';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: ['./alunos-lista.component.css']
})
export class AlunosListaComponent implements OnInit {

  inscricao: Subscription;

  formulario: FormGroup; 
  listaDeAlunos: Array<Aluno> = [];
  idSelecionado: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private service: AlunosService,
  ) { }

  ngOnInit() { 
    this.formulario = this.formBuilder.group(new Aluno);
    this.buscarTodasAlunos();
  }

  atualizarFiltroEaLista(aluno: Aluno) {
    this.idSelecionado = aluno.id;
    this.listaDeAlunos.push(aluno);
    this.id.patchValue(aluno.id);
  }

  buscarTodasAlunos() {
    this.service.bustarTodosAlunos()
      .subscribe((listaDeAlunos: Array<Aluno>) => {
        this.listaDeAlunos = listaDeAlunos;
      });
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group(
      new Aluno()
    );
    this.id.setValidators([
      FormUtil.valorMinimo(),
    ]);
  }

  novoAluno() {
    this.router.navigate(['alunos', CONSTANTES.OPEN_TYPE.CREATE]);
  }

  pesquisar() {
    if (this.formularioValido()) {
      console.log(this.id.value);
      this.listaDeAlunos = [];
      this.idSelecionado = null;
      if (this.id.value) {
        this.service.buscarAlunoPorId(this.id.value)
          .subscribe((Aluno: Aluno) => {
            this.listaDeAlunos.push(Aluno);
          });
      } else {
        this.service.bustarTodosAlunos()
          .subscribe((listaDeAlunos: Array<Aluno>) => {
            this.listaDeAlunos = listaDeAlunos;
          });
      }
    }
  }

  formularioValido() {
    if (this.formulario.invalid) {
      FormUtil.marcaComoDirtySeTemErro(this.formulario);
      return false;
    } else {
      return true;
    }
  }

  validaNumero(event: any) {
    FormUtil.validaNumero(event);
  }

  mostrarErro(controlName: string): boolean {
    return FormUtil.mostrarErro(this.formulario, controlName);
  }

  limpar(): void {
    this.formulario.reset();
    this.listaDeAlunos = [];
    this.idSelecionado = null;
  }

  estaSelecionadoRegistro(id: number): boolean {
    return (this.idSelecionado === id) ? true : false;
  }

  selecionarRegistro(id: number): void {
    this.idSelecionado = this.estaSelecionadoRegistro(id) ? null : id;
  }

  detalhes(aluno: Aluno): void {
    this.router.navigate(['alunos', `${aluno.id}`, 'detalhe'], { state: { aluno: aluno } });
  }

  desabilitar(status: string) {
    return status === 'DESATIVADA' ? true : false;
  }

  desativar(id: number) {
    this.openModal()
      .then(() => {
        //clicou no confirm     
        this.desativarAluno(id);
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
    ngbModalRef.componentInstance.body = 'Gostaria de desativar o Aluno? ';
    return ngbModalRef.result;
  }

  desativarAluno(id: number) {
    this.service.excluirAluno(id)
      .subscribe(() => {
        this.service.bustarTodosAlunos()
          .subscribe((listaDeAlunos: Array<Aluno>) => {
            this.listaDeAlunos = listaDeAlunos;
          })
      });
  }

  get id(): AbstractControl { return this.formulario.get('id'); }


}
