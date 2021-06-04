import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";

export interface IReportService{
    getPdf(pedidos: IPedido): Promise<any>;
}