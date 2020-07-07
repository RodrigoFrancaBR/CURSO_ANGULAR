import { UnidadeService } from './../unidade.service';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  listaDeUnidades: Unidade[] = [];

  constructor(private service: UnidadeService) { }

  ngOnInit() {
    this.service.obterUnidades().subscribe((res) => {
      console.log(res);
      this.listaDeUnidades = res;
    });
  }

}
