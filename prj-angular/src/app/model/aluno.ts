import { AbstractControl, FormGroup } from '@angular/forms';
import { Unidade } from './unidade';

export class Aluno {

    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public cep?: string,
        public numero?: number,
        public complemento?: string,
        public rua?: string,
        public bairro?: string,
        public cidade?: string,
        public estado?: string,
        public status?: string,
    ) { }
}
