import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IProduto } from "../interfaces/entities/produto.entity.interface";

export class Produto implements IProduto{
    id: number;
    nome: string;
    cor: string;
    tamanho: string;
    valor: number;
    pedidos: IPedido[];
}