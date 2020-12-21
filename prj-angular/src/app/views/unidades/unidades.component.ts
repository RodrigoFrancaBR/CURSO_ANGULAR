import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { observable, Subscription, Observable } from 'rxjs';
import { Unidade } from 'src/app/model/unidade';
import { UnidadesService } from './unidades.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  titulo = 'Tela de Pesquisa de Unidades';

  listaDeUnidades: Array<Unidade> = [];
  inscricao: Subscription;
  idSelecionado: number;

  constructor(
    private service: UnidadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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

  /**
   * Existem 2 maneiras de acessar os parâmetros. 
   * O primeiro é usando route.snapshot.params 
   * e o segundo é por meio de route.params.subscribe.
   */
  private obterParametroDaRota(): number {
    let idSelecionado;

    /**
 * Se você não pretende atualizar seu parâmetro de URL no mesmo componente que está acessando
 */

    idSelecionado = this.activatedRoute.snapshot.params.id;

    /**
     * Se você pretende atualizar o parâmetro de URL no mesmo componente
      */

    // this.inscricao = this.activatedRoute.params.subscribe((params) => {
    //   idSelecionado = params.id
    // });

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
    console.log(id);
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
    this.router.navigate(['unidades', 'novo']);
  }

}
