import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UnidadeService } from './unidade.service';
import { Unidade } from 'src/app/model/unidade';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
