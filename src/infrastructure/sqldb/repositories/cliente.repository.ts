import { Injectable } from "@nestjs/common";
import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { IClienteRepository } from "src/domain/cliente/interfaces/repositories/cliente.repository.interface";
import { EntityDuplicateException } from "src/domain/utils/exceptions/entityDuplicateException";
import { EntityRepository, Repository } from "typeorm";
import { ClienteEntity } from "../entities/cliente.entity";

@Injectable()
@EntityRepository(ClienteEntity)
export class ClienteRepository extends Repository<ClienteEntity> implements IClienteRepository {
    
    
    async doSave(cliente: ICliente): Promise<ICliente>{
        try {
            const newCliente = this.create(cliente);
            return await this.save(newCliente);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY')
                throw new EntityDuplicateException('Client with that document already exists');
            throw error;
        }
    }
    
    async doUpdate(cliente: ICliente): Promise<ICliente>{
        try {
            let updateCliente = await this.findOneOrFail(cliente.id);
            if (cliente?.nome) updateCliente.nome = cliente.nome
            if (cliente?.cpf) updateCliente.cpf = cliente.cpf
            if (cliente?.sexo) updateCliente.sexo = cliente.sexo
            if (cliente?.email) updateCliente.email = cliente.email
            return await this.save(updateCliente);
        } catch (error) {
            throw error;
        }
    }
    
    async doRemove(id: number): Promise<ICliente>{
        let cliente: ClienteEntity = await this.findOneOrFail(id);
        cliente.enable = false;
        this.save(cliente);
        return cliente;
    }
    
    async doFindById(id: number): Promise<ICliente>{
        return await this.createQueryBuilder('cliente')
        .where("cliente.id = :id", { id: id })
        .andWhere(`cliente.enable = :enable`,  { enable: true })
        .getOneOrFail();
    }
    
    async doFindAll(): Promise<ICliente[]>{
        return await this.createQueryBuilder('cliente')
        .andWhere(`cliente.enable = TRUE`)
        .orderBy('cliente.nome', "DESC")
        .getMany();
    }
}