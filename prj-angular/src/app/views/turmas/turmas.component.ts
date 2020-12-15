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

  constructor() { }

  ngOnInit() { }

}
