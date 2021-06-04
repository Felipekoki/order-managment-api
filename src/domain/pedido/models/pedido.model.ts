import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { IPedido } from "../interfaces/entities/pedido.entity.interface";
import { FormaPagamentoTypeEnum } from "./enum/forma-pagamento.type.enum";

export class Pedido implements IPedido{
    id: number;
    observacao: string; 
    formaPagamento: FormaPagamentoTypeEnum;
    createdAt: Date;
    cliente: ICliente;
    produtos: IProduto[];
}