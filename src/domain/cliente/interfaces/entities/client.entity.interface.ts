import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { SexoTypeEnum } from "../../models/enum/sexo.type.enum";

export interface ICliente{
    id: number;
    nome: string;
    cpf: string;
    sexo: SexoTypeEnum;
    email: string;
    pedidos: IPedido[];
}