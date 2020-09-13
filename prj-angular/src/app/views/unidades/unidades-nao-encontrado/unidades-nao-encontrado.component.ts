import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadeService } from '../unidade.service';
import { Unidade } from 'src/app/model/unidade';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unidades-nao-encontrado',
  templateUrl: './unidades-nao-encontrado.component.html',
  styleUrls: ['./unidades-nao-encontrado.component.css']
})
export class UnidadesNaoEncontradoComponent implements OnInit {

  // formularioDetalhe: FormGroup;
  // inscricao: Subscription;
  // unidadeSelecionada: number;
  // unidade: Unidade = new Unidade();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UnidadeService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    // console.log('oninit')
    // this.obterParametroDaRota();
    // this.buscarUnidade();
    // this.iniciarFormulario(this.unidade);
  }

  // buscarUnidade(): void {
  //   this.service.buscarUnidadePorId(this.unidadeSelecionada).subscribe((unidade: Unidade) => {
  //     this.unidade = unidade;
  //   });
  // }

  // obterParametroDaRota(): void {
  //   this.inscricao = this.activatedRoute.params.subscribe(params => this.unidadeSelecionada = params.id);
  // }

  // iniciarFormulario(unidade: Unidade): void {
  //   this.formularioDetalhe = this.formBuilder.group(
  //     unidade
  //   );
  //   this.formularioDetalhe.disable();
  // }

  // editar() {
  //   console.log('editar')
  // }

  // remover() {
  //   console.log('editar')
  // }

  // voltar() {
  //   this.router.navigate(['unidades'])
  // }

  // ngOnDestroy() {
  //   this.inscricao.unsubscribe();
  // }

}
