import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { distinctUntilChanged } from "rxjs/operators";

export class FormValidations {

    static notEquals(controlName: string) {
        //let subscribe: boolean = false;

        return (control: AbstractControl) => {

            if (controlName == null) {
                throw new Error('controlName não informado.');
            }

            if (control.root && (control.root as FormGroup).controls) {

                const formulario: FormGroup = control.root as FormGroup;
                const otherControl: AbstractControl = formulario.get(controlName);                

                if (!otherControl) {
                    throw new Error(`O ${controlName} é um controlName inválido.`);
                }

                if (otherControl.value && control.value) {
                    // if (!subscribe) {
                    //     subscribe = true;
                    //     control.valueChanges
                    //         .pipe(distinctUntilChanged())
                    //         .subscribe(() => {
                    //             control.updateValueAndValidity();
                    //         });
                    // }

                    return otherControl.value !== control.value ? { notEquals: true } : null;
                }
            }

            return null;
        }
    }

    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep && cep !== '') {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }
        return null;
    }

    static requiredMinCheckbox(): ValidatorFn {
        return (formArray: FormArray): ValidationErrors | null => {
            return formArray.controls
                .map(control => control.value)
                .some((value: boolean) => value) ? null : { required: true };
        };
    }

    // static requiredMinCheckbox(): ValidatorFn {
    //     return (formArray: FormArray): ValidationErrors | null => {
    //         const isChecked = formArray.controls
    //             .map((control) => {
    //                 return control.value;
    //             })
    //             .some((value: boolean) => {
    //                 return value;
    //             });

    //         return isChecked ? null : { required: true };
    //     };
    // }

    // com opção de escolher o min de check 
    // static requiredMinCheckbox(min = 1) {
    //     const validator = (formArray: FormArray) => {
    //         const totalChecked = formArray.controls
    //             .map(v => v.value)
    //             .reduce((total, current) => current ? total + 1 : total, 0);
    //         return totalChecked >= min ? null : { required: true };
    //     };
    //     return validator;
    // }

}