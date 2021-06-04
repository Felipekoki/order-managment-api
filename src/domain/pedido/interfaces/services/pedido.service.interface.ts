import { DoCreatePedidoDto } from "../../dtos/do-create-pedido.dto.request";
import { DoRemovePedidoResponseDto } from "../../dtos/do-remove-pedido.dto.response";
import { DoUpdatePedidoDto } from "../../dtos/do-update-pedido.dto.request";
import { IPedido } from "../entities/pedido.entity.interface";

export interface IPedidoService{
    save(pedido: DoCreatePedidoDto): Promise<IPedido>;
    update(pedido: DoUpdatePedidoDto): Promise<IPedido>;
    remove(id: number): Promise<DoRemovePedidoResponseDto>;
    findById(id: number): Promise<IPedido>;
    findAll(): Promise<IPedido[]>;
}



