import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Unidade } from 'src/app/model/unidade';
import { Subscription } from 'rxjs';
import { UnidadeService } from '../unidade.service';

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
        private service: UnidadeService,
        private formBuilder: FormBuilder

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

    remover() {
        console.log('editar')
    }

    voltar() {
        this.router.navigate(['unidades', this.formularioDetalhe.get('id').value]);
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}