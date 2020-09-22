import { Component, OnInit, OnDestroy, } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Unidade } from 'src/app/model/unidade';
import { UnidadesService } from '../unidades.service';
import { ModalConfirmacaoComponent } from './../../../components/modal-confirmacao/modal-confirmacao.component';

@Component({
    selector: 'app-unidades-detalhe',
    templateUrl: './unidades-detalhe.component.html',
    styleUrls: ['./unidades-detalhe.component.css']
})
export class UnidadesDetalheComponent implements OnInit, OnDestroy {
    formularioDetalhe: FormGroup;
    inscricao: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: UnidadesService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal

    ) { }

    ngOnInit() {
        this.configurarFormulario(new Unidade());

        let idSelecionado = this.obterParametroDaRota();

        if (idSelecionado) {
            this.buscarUnidadePorId(idSelecionado);

        } else {
            this.router.navigate(['unidades/naoEncontrado']);
        }
    }

    private configurarFormulario(unidade: Unidade): void {
        this.formularioDetalhe = this.formBuilder.group(
            unidade
        );
        this.formularioDetalhe.disable();
    }

    private obterParametroDaRota(): number {
        let idSelecionado;
        this.inscricao = this.activatedRoute.params.subscribe(params => idSelecionado = params.id);
        return idSelecionado;
    }

    private buscarUnidadePorId(id: number) {
        this.service.buscarUnidadePorId(id)
            .subscribe((unidade: Unidade) => {
                this.configurarFormulario(unidade);
            })
    }

    editar() {
        this.router.navigate(['unidades', this.formularioDetalhe.get('id').value, 'editar']);
    }

    desativar() {
        this.openModal()
            .then(() => {
                //clicou no confirm     
                this.desativarUnidade();
            }, () => {
                // clicou no cancel ou no x 
            });
    }

    voltar() {
        this.router.navigate(['unidades', this.formularioDetalhe.get('id').value]);
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


    desativarUnidade() {
        this.service.excluirUnidade(this.formularioDetalhe.get('id').value)
            .subscribe(() => this.router.navigate(['unidades']));
    }


    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    desabilitar() {
        return this.formularioDetalhe.get('status').value === 'DESATIVADA' ? true : false
    }

}