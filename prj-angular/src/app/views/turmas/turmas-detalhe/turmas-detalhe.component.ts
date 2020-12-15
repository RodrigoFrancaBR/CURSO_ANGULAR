import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Turma } from 'src/app/model/turma';
import { TurmasService } from '../turmas.service';

@Component({
  selector: 'app-turmas-detalhe',
  templateUrl: './turmas-detalhe.component.html',
  styleUrls: ['./turmas-detalhe.component.css']
})
export class TurmasDetalheComponent implements OnInit {
  formularioDetalhe: FormGroup;
  inscricao: Subscription;
  listaDeStatus: Array<string> = ['ATIVA', 'DESATIVADA'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: TurmasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal

  ) { }

  ngOnInit() {

    console.log(this.router);
    console.log(this.activatedRoute);

    this.configurarFormulario(new Turma());
    this.inscricao = this.activatedRoute.url.subscribe(value=>{
      console.log(value[0].path);
    })

    let idSelecionado = this.obterParametroDaRota();

    if (idSelecionado) {
      this.buscarTurmaPorId(idSelecionado);

    } else {
      this.router.navigate(['turmas/naoEncontrado']);
    }
  }

  private configurarFormulario(Turma: Turma): void {
    this.formularioDetalhe = this.formBuilder.group(
      Turma
    );
    this.formularioDetalhe.disable();
  }

  private obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params.subscribe(params => idSelecionado = params.id);
    return idSelecionado;
  }

  private buscarTurmaPorId(id: number) {
    this.service.buscarTurmaPorId(id)
      .subscribe((Turma: Turma) => {
        this.configurarFormulario(Turma);
      })
  }

  editar() {
    this.nome.enable();
    this.status.enable();
    // this.router.navigate(['turmas', this.formularioDetalhe.get('id').value, 'editar']);
  }

  desativar() {
    this.openModal()
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

  openModal(): Promise<any> {
    const ngbModalRef = this.modalService.open(
      ModalConfirmacaoComponent,
      {
        size: 'sm',
      });
    ngbModalRef.componentInstance.body = 'Gostaria de desativar a Turma? ';
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


  get nome(): AbstractControl {
    return this.formularioDetalhe.get('nome');
  }

  get status(): AbstractControl {
    return this.formularioDetalhe.get('status');
  }

}
