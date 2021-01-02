import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {

    static requiredMinCheckbox(): ValidatorFn {
        return (formArray: FormArray): ValidationErrors | null => {

            const isChecked = formArray.controls
                .map((control) => {
                    return control.value;
                })
                .some((element: boolean) => {
                    return element;
                });

            return isChecked ? null : { required: true };

            // return !formArray.controls.map(control => control.value).some((e: boolean) => e === true) ? { required: true } : null
            // return control.value && control.value < 1 ? { valorMenorQueUm: true } : null;
        };
    }

    // static requiredMinCheckbox(min = 1) {

    // const validator = (formArray: FormArray) => {            
    //     formArray.controls
    //         // retornar um array de true or false    
    //         .map(c => c.value)
    //         // current = true or false
    //         .reduce((totalChecked: number, current: boolean) => {
    //             current ? totalChecked + 1 : totalChecked, 0
    //         })
    //     return totalChecked >= min ? null : { required: true };
    // };
    // return validator;
    // }
}