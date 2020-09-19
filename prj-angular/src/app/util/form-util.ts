import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class FormUtil {
    static validarNumero(evento: any): void {
        throw new Error("Method not implemented.");
    }

    static valorMinimo(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return  control.value && control.value < 1 ? { valorMenorQueUm: true } : null;
        };
    }

    static mostrarErro(formGroup: FormGroup, controlName: string) {
        return FormUtil.isValid(formGroup, controlName);
    }

    // um campo é inválido qdo possui algum erro, e se tiver sido tocado ou ganho foco.
    static isValid(formGroup: FormGroup, controlName: string): boolean {
        return formGroup.get(controlName).errors
            && (formGroup.get(controlName).touched || formGroup.get(controlName).dirty) ? true : false;
    }

    static aplicarCSSErro(formGroup: FormGroup, controlName?: string) {
        const resultado = FormUtil.isValid(formGroup, controlName);
        // return resultado ? { 'is-invalid': true } : null;
        // usado para retornar css verde para campos válidos
        return resultado ? { 'is-invalid': true } : formGroup.get(controlName).pristine && !resultado ? null : { 'is-valid': true };
    }

    // marca todos os campos como dirty desde que este tenha algum error
    static marcaComoDirtySeTemErro(fg: FormGroup) {
        console.log(`marcaComoDirtySeTemErro ${fg}`);
        Object.keys(fg.controls).forEach(campo => {
            const controle = fg.get(campo);
            if (controle.errors) {
                console.log(`${controle.errors}`);
                controle.markAsDirty();
            }
            // if (controle instanceof FormGroup) {
            //     FormUtil.verificarValidacaoForm(controle);
            // }
        });
    }


    // static verificarValidacaoForm(fg: FormGroup) {
    //     Object.keys(fg.controls).forEach(campo => {
    //         const controle = fg.get(campo);
    //         controle.markAsDirty();
    //         if (controle instanceof FormGroup) {
    //             FormUtil.verificarValidacaoForm(controle);
    //         }
    //     });
    // }

    static validaNumero(evt) {
        const theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        const regex = /[0-9]/;
          /*Para aceitar o backspace */
          if (key === '\u0008') {
            return ;
           }
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) {
            theEvent.preventDefault();
          }
        }
      }

}

