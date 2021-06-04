import { DoCreateClienteDto } from "../../dtos/do-create-cliente.dto.request";
import { DoRemoveClienteResponseDto } from "../../dtos/do-remove-cliente.dto.response";
import { DoUpdateClienteDto } from "../../dtos/do-update-cliente.dto.request";
import { ICliente } from "../entities/client.entity.interface";

export interface IClienteService{
    save(cliente: DoCreateClienteDto): Promise<ICliente>;
    update(cliente: DoUpdateClienteDto): Promise<ICliente>;
    remove(id: number): Promise<DoRemoveClienteResponseDto>;
    findById(id: number): Promise<ICliente>;
    findAll(): Promise<ICliente[]>;
}



