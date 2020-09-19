import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Unidade } from 'src/app/model/unidade';
import { UnidadeService } from '../unidade.service';
import { FormUtil } from 'src/app/util/form-util';

@Component({
    selector: 'app-unidades-editar',
    templateUrl: './unidades-editar.component.html',
    styleUrls: ['./unidades-editar.component.css']
})
export class UnidadesEditarComponent {
    formularioEditar: FormGroup;
    inscricao: Subscription;
    unidade: Unidade;

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

    private obterParametroDaRota(): number {
        let idSelecionado;
        this.inscricao = this.activatedRoute.params.subscribe(params => idSelecionado = params.id);
        return idSelecionado;
    }

    private buscarUnidadePorId(id: number) {
        this.service.buscarUnidadePorId(id)
            .subscribe((unidade: Unidade) => {
                this.configurarFormulario(unidade);
                this.unidade = unidade;
            })
    } 

    configurarFormulario(unidade: Unidade): void {
        this.formularioEditar = this.formBuilder.group(
            unidade
        );
        this.formularioEditar.get('id').disable();
        this.formularioEditar.get('status').disable();
        this.nome.setValidators([Validators.required, Validators.maxLength(20)])
        this.endereco.setValidators([Validators.required, Validators.maxLength(60)])
    }

    get nome(): AbstractControl {
        return this.formularioEditar.get('nome');
    }

    get endereco(): AbstractControl {
        return this.formularioEditar.get('endereco');
    }

    mostrarErro(controlName: string) {
        return FormUtil.mostrarErro(this.formularioEditar, controlName);
    }

    atualizar() {
        if (this.formularioValido()) {
            this.service.atualizaUnidade(this.formularioEditar.value, this.unidade.id)
                .subscribe(() => { this.router.navigate(['unidades']); });
        }
    }

    private formularioValido(): boolean {
        if (this.formularioEditar.invalid) {
            FormUtil.marcaComoDirtySeTemErro(this.formularioEditar);
            return false;
        } else {
            return true;
        }
    }

    cancelar() {
        this.router.navigate(['unidades']);
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}