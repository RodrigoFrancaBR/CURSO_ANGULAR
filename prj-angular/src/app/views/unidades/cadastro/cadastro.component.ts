import { Unidade } from './../../../model/unidade';
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

  unidade: Unidade = {};

  ngOnInit() {
    this.service.showMessage('Bem vindo a tela de cadastro de unidade');
  }

  salvar() {
    // console.log(this.service);

    this.service.salvarUnidade(this.unidade).subscribe((res) => {
      return (res.id > 0 ? this.service.showMessage('unidade salva com sucesso ' + res.id) : this.service.showMessage(''));
    },
      (error: any) => {
        console.log(error);
      });
  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

}
