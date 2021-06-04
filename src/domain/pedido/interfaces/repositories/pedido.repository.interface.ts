import { IPedido } from "../entities/pedido.entity.interface";

export interface IPedidoRepository 
{
    doSave(pedido: IPedido): Promise<IPedido>;
    doUpdate(pedido: IPedido): Promise<IPedido>;
    doRemove(id: number): Promise<IPedido>;
    doFindById(id: number): Promise<IPedido>;
    doFindAll(): Promise<IPedido[]>;
}