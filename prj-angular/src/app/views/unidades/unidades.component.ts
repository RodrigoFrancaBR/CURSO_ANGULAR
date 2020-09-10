import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() { }

  obterEventDePesquisa(event: any) {
    console.log(event);
  }
}
