
export class DoRemovePedidoResponseDto{
    constructor(id: number, message: string){
        this.id = id;
        this.message = message;
    }
    
    id: number;
    message: string;
}