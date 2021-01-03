import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailExisteValidator(email: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (email){
            
        }
        if (control.value) {
            return control.value >= this.obterDataAtual() ? { dataNaoPodeSerMaiorOuIgualADataAtual: true } : null;
        }
        return null;
    }

}