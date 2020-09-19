import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Unidade } from 'src/app/model/unidade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades-lista',
  templateUrl: './unidades-lista.component.html',
  styleUrls: ['./unidades-lista.component.css']
})
export class UnidadesListaComponent implements OnInit {

  @Input()
  listaDeUnidades: Array<Unidade>;

  @Input()
  idSelecionado: number;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.idSelecionado && this.idSelecionado) {
      this.idSelecionado = null;
      this.selecionarRegistro(changes.idSelecionado.currentValue);
    }
  }

  detalhes(id: number): void {
    this.router.navigate(['unidades', `${id}`, 'detalhe']);
  }

  remover(id: number): void {    
    // this.router.navigate([this.resourceName, 'remove', result.rowId]);
  }


  estaSelecionadoRegistro(id: number): boolean {
    return (this.idSelecionado === id) ? true : false;
  }

  selecionarRegistro(id: number): void {
    this.idSelecionado = this.estaSelecionadoRegistro(id) ? null : id;
  }

}
