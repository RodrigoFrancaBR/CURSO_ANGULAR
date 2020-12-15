import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Turma } from 'src/app/model/turma';
import { TurmasService } from './turmas.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  titulo = 'Tela de Pesquisa de Turmas';

  listaDeTurmas: Array<Turma> = [];
  inscricao: Subscription;
  idSelecionado: number;

  constructor(
    private service: TurmasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // let idSelecionado = this.obterParametroDaRota();
    // if (idSelecionado) {
    //   // obtem a Turma na base de dados e atualiza o filtro e a grid
    //   this.service.buscarTurmaPorId(idSelecionado)
    //     .subscribe((Turmaselecionada: Turma) => {
    //       this.atualizarFiltroEaLista(Turmaselecionada);
    //     });

    // } else {
    //   this.buscarTodasTurmas();
    // }
  }

  private obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params.subscribe((params) => {
      console.log('obterParam')
      idSelecionado = params.id
    });
    return idSelecionado;
  }

  private atualizarFiltroEaLista(turma: Turma) {
    this.idSelecionado = turma.id;
    this.listaDeTurmas.push(turma);
  }

  private buscarTodasTurmas() {
    this.service.bustarTodasTurmas()
      .subscribe((listaDeTurmas: Array<Turma>) => {
        this.listaDeTurmas = listaDeTurmas;
      });
  }

  obterEventoDeLimpar(evento: any) {
    this.listaDeTurmas = [];
    this.idSelecionado = evento;
  }

  obterIdDaPesquisa(id: number) {
    console.log(id);
    this.listaDeTurmas = [];
    this.idSelecionado = null;
    if (id) {
      this.service.buscarTurmaPorId(id)
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

  novaTurma() {
    this.router.navigate(['turmas', 'novo']);
  }
}
