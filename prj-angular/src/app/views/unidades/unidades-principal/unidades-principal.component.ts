import { Component, OnInit } from '@angular/core';

import { UnidadesService } from '../unidades.service';
import { Unidade } from 'src/app/model/unidade';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidade-novo',
  templateUrl: './unidades-principal.component.html',
  styleUrls: ['./unidades-principal.component.css']
})
export class UnidadesPrincipalComponent implements OnInit {

  listaDeUnidades: Array<Unidade> = [];
  inscricao: Subscription;
  idSelecionado: number;

  constructor(
    private service: UnidadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    let idSelecionado = this.obterParametroDaRota();
    if (idSelecionado) {
      // obtem a unidade na base de dados e atualiza o filtro e a grid
      this.service.buscarUnidadePorId(idSelecionado)
        .subscribe((unidadeSelecionada: Unidade) => {
          this.atualizarFiltroEaLista(unidadeSelecionada);
        });

    } else {
      this.buscarTodasUnidades();
    }
  }

  private obterParametroDaRota(): number {
    let idSelecionado;
    this.inscricao = this.activatedRoute.params.subscribe(params => idSelecionado = params.id);
    return idSelecionado;
  }

  private atualizarFiltroEaLista(unidade: Unidade) {
    this.idSelecionado = unidade.id;
    this.listaDeUnidades.push(unidade);

  }

  private buscarTodasUnidades() {
    this.service.bustarTodasUnidades()
      .subscribe((listaDeUnidades: Array<Unidade>) => {
        this.listaDeUnidades = listaDeUnidades;
      });
  }

  obterEventoDeLimpar(evento: any) {
    this.listaDeUnidades = [];
    this.idSelecionado = evento;
  }

  obterIdDaPesquisa(id: number) {
    this.listaDeUnidades = [];
    this.idSelecionado = null;
    if (id) {
      this.service.buscarUnidadePorId(id)
        .subscribe((unidade: Unidade) => {
          this.listaDeUnidades.push(unidade);
        });
    } else {
      this.service.bustarTodasUnidades()
        .subscribe((listaDeUnidades: Array<Unidade>) => {
          this.listaDeUnidades = listaDeUnidades;
        });
    }

  }

  novaUnidade() {
    this.router.navigate(['unidades','novo']);
  }

}
