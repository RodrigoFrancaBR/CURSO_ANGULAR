import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private router: Router, private service: UnidadeService, private toastr: ToastrService) { }

  unidade: Unidade = {};

  ngOnInit() {
    ToastrMensagemUtil.info(this.toastr, 'Bem vindo a tela de cadastro de unidade');
  }

  salvar() {
    // console.log(this.service);

    this.service.salvarUnidade(this.unidade).subscribe((res) => {
      // tslint:disable-next-line: max-line-length
      return (res.id > 0 ? ToastrMensagemUtil.success(this.toastr, 'unidade salva com sucesso ' + res.id) : ToastrMensagemUtil.error(this.toastr, ''));
    },
      (error: any) => {
        console.log(error);
      });
  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

}
