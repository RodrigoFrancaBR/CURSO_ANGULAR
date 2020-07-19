import { Input, Component, Type } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';


const MESSAGE: { [name: string]: string } = {
    teste: 'teste.',
    required: 'Digite um id válido.',
};


@Component({
    selector: 'form-mensagem',
    templateUrl: './form-mensagem.component.html',
    styleUrls: ['./form-mensagem.component.scss']
})

export class FormMensagemComponent {
    @Input()
    mostraErro: boolean = false;

    @Input()
    msg: string;

    @Input()
    get errors(): ValidationErrors {
        return this._errors;
    }

    _errors: ValidatorFn;

    set errors(errors: ValidationErrors) {
        if (errors) {
            console.log('tem erro')
            Object.keys(errors).map(e => this.msg = MESSAGE[e]);
            // Object.keys(errors).map(e => this.msg = FormMensagemComponent.getErrorMessage(e, errors[e]));
        } else {
            this.msg = null;
        }
    }

}