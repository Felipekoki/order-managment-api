import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";

export interface IEmailService{
    sendEmail(pedidos: IPedido): void;
}