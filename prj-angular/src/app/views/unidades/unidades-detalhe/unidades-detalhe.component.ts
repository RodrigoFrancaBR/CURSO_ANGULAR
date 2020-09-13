import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
    unidadeSelecionada: number;
    unidade: Unidade;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: UnidadeService,
        private formBuilder: FormBuilder

    ) { }

    ngOnInit() {
        console.log('oninit')
        this.obterParametroDaRota();
        this.buscarUnidade();
        if (this.unidade) {
            this.iniciarFormulario(this.unidade);
        } else {
            this.iniciarFormulario(new Unidade());
            this.router.navigate(['naoEncontrado']);
        }

    }

    obterParametroDaRota(): void {
        this.inscricao = this.activatedRoute.params.subscribe(params => this.unidadeSelecionada = params.id);
    }

    buscarUnidade(): void {
        this.unidade = this.service.getUnidade(this.unidadeSelecionada);
        // this.service.buscarUnidadePorId(this.unidadeSelecionada).subscribe((unidade: Unidade) => {
        //     this.unidade = unidade;
        // });
    }

    iniciarFormulario(unidade: Unidade): void {
        this.formularioDetalhe = this.formBuilder.group(
            unidade
        );
        this.formularioDetalhe.disable();
    }

    editar() {
        this.router.navigate(['unidades'])
    }

    remover() {
        console.log('editar')
    }

    voltar() {
        this.router.navigate(['unidades'])
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}