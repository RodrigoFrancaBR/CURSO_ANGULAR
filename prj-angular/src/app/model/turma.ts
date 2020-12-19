import { Unidade } from './unidade';

export class Turma {
    constructor(
        public id?: number,
        public nome?: string,
        public status?: string,
        public unidadeId?: number
    ) {

    }

}
