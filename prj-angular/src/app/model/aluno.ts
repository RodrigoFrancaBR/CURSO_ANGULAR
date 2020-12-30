import { Endereco } from "./endereco";

export class Aluno {

    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public status?: string,
        public sexo?: string,
        public condicao?:boolean
    ) { }
}
