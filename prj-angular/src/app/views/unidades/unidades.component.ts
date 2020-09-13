import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UnidadeService } from './unidade.service';
import { Unidade } from 'src/app/model/unidade';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  listaDeUnidades: Array<Unidade> = [];

  constructor(
    private service: UnidadeService) {
  }

  ngOnInit() { }

  obterValorDaPesquisa(id: number) {
    if (id) {
      this.service.buscarUnidadePorId(id).subscribe(resposta => {
        this.limparList();
        this.listaDeUnidades.push(resposta)
      });
    } else {
      this.service.bustarTodasUnidades().subscribe(resposta => {
        this.limparList();
        this.listaDeUnidades = resposta
      });
    }
  }

  limparList(): void {
    this.listaDeUnidades = [];
  }

}
