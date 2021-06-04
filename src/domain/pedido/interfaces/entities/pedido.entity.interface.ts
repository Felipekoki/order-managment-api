import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { FormaPagamentoTypeEnum } from "../../models/enum/forma-pagamento.type.enum";

export interface IPedido{
    id: number;
    observacao: string; 
    formaPagamento: FormaPagamentoTypeEnum;
    createdAt: Date;
    cliente: ICliente;
    produtos: IProduto[];
}