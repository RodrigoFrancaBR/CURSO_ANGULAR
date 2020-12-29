export class Endereco {

    constructor(             
        public cep?: string,
        public numero?: number,
        public complemento?: string,
        public rua?: string,
        public bairro?: string,
        public cidade?: string,
        public estado?: string,        
    ) { }
}