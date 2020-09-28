import { UnidadesService } from './../unidades.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Unidade } from 'src/app/model/unidade';
import { Router } from '@angular/router';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
  formularioDetalhe: any;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private service: UnidadesService) { }

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

  desativar(id: number) {
    this.openModal()
      .then(() => {
        //clicou no confirm     
        this.desativarUnidade(id);
      }, () => {
        // clicou no cancel ou no x 
      });
  }

  openModal(): Promise<any> {
    const ngbModalRef = this.modalService.open(
      ModalConfirmacaoComponent,
      {
        size: 'sm',
      });
    ngbModalRef.componentInstance.body = 'Gostaria de desativar a unidade? ';
    return ngbModalRef.result;
  }


  desativarUnidade(id: number) {
    this.service.excluirUnidade(id)
      .subscribe(() => {
        this.service.bustarTodasUnidades()
          .subscribe((listaDeUnidades: Array<Unidade>) => {
            this.listaDeUnidades = listaDeUnidades;
          })
      });
  }

  estaSelecionadoRegistro(id: number): boolean {
    return (this.idSelecionado === id) ? true : false;
  }

  selecionarRegistro(id: number): void {
    this.idSelecionado = this.estaSelecionadoRegistro(id) ? null : id;
  }


  desabilitar(status: string) {
    return status === 'DESATIVADA' ? true : false;
  }

}
