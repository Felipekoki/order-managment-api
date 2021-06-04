import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { ICliente } from "../interfaces/entities/client.entity.interface";
import { SexoTypeEnum } from "./enum/sexo.type.enum";

export class Cliente implements ICliente{
    id: number;
    nome: string;
    cpf: string;
    sexo: SexoTypeEnum;
    email: string;
    pedidos: IPedido[];
}