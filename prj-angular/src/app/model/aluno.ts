import { Endereco } from "./endereco";

export class Aluno {

    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public endereco: Endereco= new Endereco(),
        public status?: string,
    ) { }
}
