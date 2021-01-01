import { Component, DoCheck, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/** 
  retorna um obj de chave valor aonde o codigo do erro é a chave e o boolean tue ou false é o valor
  console.log(this._control.errors); // output {required:true}

  retorna uma lista de chaves  um vetor de erros um vetor com os códigos dos erros
  console.log(Object.keys(this._control.errors)); // output ["required"]
  
  const errors = Object.keys(this._control.errors);
  console.log(errors); // output ["required"]
  console.log(errors[0]); // output "required"
  
  const errosCode = errors[0];
  console.log(errosCode); // output "required"
* 
 */

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements DoCheck {

  private _control: AbstractControl;
  
  get control() { return this._control; }
  
  @Input() set control(control: AbstractControl) { this._control = control; };
  
  msg: string;

  constructor() { }

  readonly getMessageByErrorCode = (errorCode: string, error: ValidationErrors) => {
    const message = {
      'maxlength': `Quantidade de caracteres deve ser menor ou igual a ${error.requiredLength} e não ${error.actualLength}`,
      'required': `Campo de preenchimento obrigatório`,
      'email': `Informe um email válido. Ex: email@email.com`,
      'valorMenorQueUm': ' Digite um valor maior que 0.'
    }
    return message[errorCode];
  }

  ngDoCheck() {
    if (this._control.errors) {
      // console.log('tem erro no controle');
      Object.keys(this._control.errors)
        .map((errorCode: string) => {
          this.msg = this.getMessageByErrorCode(errorCode, this._control.errors[errorCode]);
          if (this.msg) {
            // console.log(this.msg);
          } else {
            // throw new Error.
            // console.log('msg não encontrada');
          }
        });
    } else {
      this.msg = null;
    }
  }

  mostrarErro(): boolean {
    return this._control.invalid && this.isTouchedOrDirty() ? true : false
  }

  isTouchedOrDirty(): boolean {
    return (this.control.touched || this.control.dirty);
  }

}
