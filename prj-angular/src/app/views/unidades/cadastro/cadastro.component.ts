import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadeService } from '../unidade.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private service: UnidadeService) { }

  ngOnInit() {
    this.service.showMessage('Bem vindo a tela de cadastro de unidade');
  }

  salvar() {
    this.service.showMessage('Salvando unidade');
  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

}
