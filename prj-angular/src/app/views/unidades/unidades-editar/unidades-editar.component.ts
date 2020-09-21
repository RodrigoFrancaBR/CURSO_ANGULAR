import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Unidade } from 'src/app/model/unidade';
import { UnidadeService } from '../unidade.service';
import { FormUtil } from 'src/app/util/form-util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';

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

            this.openModal()
                .then(() => {
                    //clicou no confirm     
                    this.atualizarUnidade();
                }, () => {
                    // clicou no cancel ou no x 
                });

        }

        // if (this.formularioValido()) {
        //     this.service.atualizaUnidade(this.formularioEditar.value, this.unidade.id)
        //         .subscribe(() => { this.router.navigate(['unidades']); });
        // }
    }

    openModal(): Promise<any> {
        // let modal = null;
        const ngbModalRef = this.modalService.open(
            ModalConfirmacaoComponent,
            {
                size: 'sm',
                //  windowClass: 'modalConfirmacao'
            });
        // setTimeout(() => {
        //     modal = document.querySelector('.modalConfirmacao');
        //     modal.classList.remove('fade');
        // }, 100);

        ngbModalRef.componentInstance.body = 'Gostaria de desativar a unidade? ';
        return ngbModalRef
            .result
            // .then(() => {
                //clicou no confirm                   
                // this.service.excluirUnidade(this.formularioDetalhe.get('id').value)
                //     .subscribe(() => this.router.navigate(['unidades']));
            // }, () => {
                // clicou no cancel ou no x                    
            // })
    }

    atualizarUnidade() {
        this.service.atualizaUnidade(this.formularioEditar.value, this.unidade.id)
            .subscribe(() => { this.router.navigate(['unidades']); });
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