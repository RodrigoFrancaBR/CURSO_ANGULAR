import { FormUtil } from 'src/app/util/form-util';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FormMessage } from './../../util/form-message';

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
export class ControlErrorComponent {

  constructor() { }

  @Input() control: AbstractControl;
  @Input() label: string;

  // get errorMessage é um atributo e tb um método get que retorna o valor do atributo.

  get errorMessage() {

    // return Object.keys(this.control.errors)
    //   .map((errorCode: string) => {
    //     return FormMessage.getMessage(this.label, errorCode, this.control.errors[errorCode]);
    //   });

    let msg: string = '';

    this.getErrorCodeList()
      .forEach((errorCode: string) => {
        msg = FormMessage.getMessage(this.label, errorCode, this.control.errors[errorCode]);
      });

    if (msg) {
      return msg;
    } else {
      throw new Error("ErrorCode não exite!");
    }
  }

  getErrorCodeList() {
    return Object.keys(this.control.errors).map((errorCode: string) => { return errorCode });
  }

  // ngDoCheck() {
  //   if (this._control.errors) {
  //     // console.log('tem erro no controle');
  //     Object.keys(this._control.errors)
  //       .map((errorCode: string) => {
  //         this.msg = this.getMessageByErrorCode(errorCode, this._control.errors[errorCode]);
  //         if (this.msg) {
  //           // console.log(this.msg);
  //         } else {
  //           // throw new Error.
  //           // console.log('msg não encontrada');
  //         }
  //       });
  //   } else {
  //     this.msg = null;
  //   }
  // }

  mostrarErro(): boolean {
    return this.control.invalid && this.isTouchedOrDirty() ? true : false
  }

  isTouchedOrDirty(): boolean {
    return (this.control.touched || this.control.dirty);
  }

}
