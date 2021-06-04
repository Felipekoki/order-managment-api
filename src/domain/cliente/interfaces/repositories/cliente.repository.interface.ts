import { ICliente } from "../entities/client.entity.interface";

export interface IClienteRepository 
{
    doSave(cliente: ICliente): Promise<ICliente>;
    doUpdate(cliente: ICliente): Promise<ICliente>;
    doRemove(id: number): Promise<ICliente>;
    doFindById(id: number): Promise<ICliente>;
    doFindAll(): Promise<ICliente[]>;
}