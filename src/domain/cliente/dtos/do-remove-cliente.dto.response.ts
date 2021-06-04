
export class DoRemoveClienteResponseDto{
    constructor(nome: string, message: string){
        this.nome = nome;
        this.message = message;
    }
    
    nome: string;
    message: string;
}