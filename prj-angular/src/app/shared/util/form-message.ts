import { ValidationErrors } from "@angular/forms";

export class FormMessage {

    static getMessage(label: string, errorCode: string, error?: ValidationErrors): string {

        const config = {
            'required': `${label} é obrigatório.`,
            'minlength': `${label} precisa ter no mínimo ${error.requiredLength} e não ${error.actualLength} caracteres.`,
            'maxlength': `${label} precisa ter no máximo ${error.requiredLength} e não ${error.actualLength} caracteres.`,
            'email': `${label} inválido. Ex: email@email.`,
            'valorMenorQueUm': `${label} precisa ter um valor maior que 0.`,
            'pattern': `${label} é obrigatório.`,
            'cepInvalido': 'CEP inválido.',
            'notEquals': `Valores informados devem ser iguais.`,
            'emailExiste': 'Email já cadastrado!',
            // 'equalsTo': 'Campos não são iguais',
        };

        return config[errorCode];
    }
}