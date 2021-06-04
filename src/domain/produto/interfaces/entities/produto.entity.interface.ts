import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";

export interface IProduto{
    id: number;
    nome: string;
    cor: string;
    tamanho: string;
    valor: number;
    pedidos: IPedido[];
}