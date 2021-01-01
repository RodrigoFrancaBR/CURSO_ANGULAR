import { Input, Component, Type } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'form-mensagem',
    templateUrl: './form-mensagem.component.html',
    styleUrls: ['./form-mensagem.component.scss']
})

export class FormMensagemComponent {

    private _control: AbstractControl;

    get control() { return this._control; }

    @Input()
    set control(control: AbstractControl) {
        this._control = control;

        // retorna um obj de chave valor aonde o codigo do erro é a chave e o boolean tue ou false é o valor
        //console.log(this._control.errors); // output {required:true}

        // retorna uma lista de chaves  um vetor de erros um vetor com os códigos dos erros        
        //console.log(Object.keys(this._control.errors)); // output ["required"]

        //const errors = Object.keys(this._control.errors);
        //console.log(errors); // output ["required"]
        //console.log(errors[0]); // output "required"

        //const errosCode = errors[0];
        // console.log(errosCode); // output "required"

        // if (this._control.errors) {
        //     console.log('tem erro no controle')
        //     Object.keys(this._control.errors)
        //         .map((errorCode: string) => {
        //             this.msg = this.getMessageByErrorCode(errorCode, this._control.errors[errorCode]);
        //             this.mostrarErro = true;
        //         });
        // } else {
        //     this.msg = null;
        //     this.mostrarErro = false;
        // }
    };


    readonly getMessageByErrorCode = (errorCode: string, error: ValidationErrors) => {
        const message = {
            'maxlength': `Quantidade de caracteres deve ser menor ou igual a ${error.requiredLength} e não ${error.actualLength}`,
            'required': `Campo de preenchimento obrigatório`,
            'email': `Informe um email válido. Ex: email@email.com`,
            'valorMenorQueUm': ' Digite um valor maior que 0.'
        }
        return message[errorCode];
    }

    @Input()
    mostraErro: boolean = false;

    mostrarErro: boolean = false;

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
                .map((error: string) => {
                    this.msg = this.getMessageByErrorCode(error, errors[error])
                });
        } else {
            this.msg = null;
        }
    }

    ngDoCheck() {
        if (this._control.errors) {
            console.log('tem erro no controle')
            Object.keys(this._control.errors)
                .map((errorCode: string) => {
                    this.msg = this.getMessageByErrorCode(errorCode, this._control.errors[errorCode]);
                    if (this.msg) {
                        this.mostrarErro = true;
                        console.log(this.msg);
                    } else {
                        console.log('msg não encontrada');
                        this.mostrarErro = false;
                    }
                });
        } else {
            this.msg = null;
            this.mostrarErro = false;
        }
    }
}