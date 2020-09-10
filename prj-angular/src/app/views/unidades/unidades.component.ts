import { Component, OnInit } from '@angular/core';
import { UnidadeService } from './unidade.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  constructor(private service: UnidadeService) {
  }

  ngOnInit() { }

  obterValorDaPesquisa(id: number) {
    console.log('obter');
    if (id) {
      this.service.buscarUnidadePorId(id).subscribe(resposta => console.log(resposta));
    } else {
      this.service.bustarTodasUnidades().subscribe(resposta => console.log(resposta));
    }
  }
}
