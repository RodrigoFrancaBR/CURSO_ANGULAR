import { Input, Component, Type } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';


// const MESSAGE: { [name: string]: string } = {
//     valorMenorQueUm: 'Digite um valor acima de 0.',
//     required: 'Campo de preenchimento obrigatório',
//     maxlength: 'A quantidade de caracteres deve ser menor ou igual a:' + this.x
// };


@Component({
    selector: 'form-mensagem',
    templateUrl: './form-mensagem.component.html',
    styleUrls: ['./form-mensagem.component.scss']
})

export class FormMensagemComponent {


    readonly getMessage = (errorName: string, error: ValidationErrors) => {
        const message = {
            'maxlength': `Quantidade de caracteres deve ser menor ou igual a ${error.requiredLength} e não ${error.actualLength}`,
            'required': `Campo de preenchimento obrigatório`,
            'valorMenorQueUm': ' Digite um valor maior que 0.'
        }
        return message[errorName];

    }

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
            Object.keys(errors)
                .map((error) => {
                    // this.msg = MESSAGE[e]
                    this.msg = this.getMessage(error, errors[error])
                });
        } else {
            this.msg = null;
        }
    }

}