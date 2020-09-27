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
  ) {
  }


  ngOnInit() {
    // this.service.emitirObservable.subscribe((observable: Observable<Unidade>) => {
    //   observable.subscribe((unidade: Unidade) => console.log(unidade));
    // });

    // this.service.emitirFiltro.subscribe((filtro: number) => {
    // });

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

    // if (this.service.emitirFiltro) {

    //   );
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
