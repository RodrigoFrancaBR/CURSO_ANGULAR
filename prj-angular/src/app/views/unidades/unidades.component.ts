import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UnidadeService } from './unidade.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent {

  constructor(private router: Router, private service: UnidadeService) { }

  navegarParaCadastro() {
    this.router.navigate(['unidades/cadastro']);

  }

}
