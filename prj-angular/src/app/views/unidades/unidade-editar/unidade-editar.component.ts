import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadeService } from '../unidade.service';
import { Unidade } from 'src/app/model/unidade';

@Component({
  selector: 'app-unidade-editar',
  templateUrl: './unidade-editar.component.html',
  styleUrls: ['./unidade-editar.component.css']
})
export class UnidadeEditarComponent implements OnInit {

  constructor(private service: UnidadeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  unidade: Unidade = {};

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.buscarUnidadePorId(id).subscribe(unidade => {
      return this.unidade = unidade;
    });
    this.service.showMessage('Bem vindo a tela de edição de unidade');
  }

  atualizar(): void {

    this.service.atualizaUnidade(this.unidade).subscribe((res) => {
      return (res.id > 0 ? this.service.showMessage('unidade atualizada com sucesso ' + res.id) : this.service.showMessage(''));
    },
      (error: any) => {
        console.log(error);
      });
  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

}
