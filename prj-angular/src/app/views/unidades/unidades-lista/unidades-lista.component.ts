import { Component, OnInit, Input } from '@angular/core';

import { Unidade } from 'src/app/model/unidade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades-lista',
  templateUrl: './unidades-lista.component.html',
  styleUrls: ['./unidades-lista.component.css']
})
export class UnidadesListaComponent implements OnInit {
  @Input() listaDeUnidades: Array<Unidade>;

  unidadeSelecionada: number;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  // mostrarErro(controlName: string) {
  //   return FormUtil.mostrarErro(this.formulario, controlName);
  // }
  editar(id: number): void {
    console.log(id);
    this.router.navigate(['unidades', `${id}`]);
  }

  remover(id: number): void {
    console.log(id);
    // this.router.navigate([this.resourceName, 'remove', result.rowId]);
  }


  estaSelecionadoRegistro(id: number): boolean {
    return (this.unidadeSelecionada === id) ? true : false;
  }

  selecionarRegistro(id: number): void {
    console.log(id);
    // this.unidadeSelecionada = (this.unidadeSelecionada === unidade.id) ? null : unidade.id;
    this.unidadeSelecionada = this.estaSelecionadoRegistro(id) ? null : id;
  }

}
