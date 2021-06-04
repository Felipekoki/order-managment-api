import { Injectable } from "@nestjs/common";
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IPedidoRepository } from "src/domain/pedido/interfaces/repositories/pedido.repository.interface";
import { EntityRepository, Repository } from "typeorm";
import { PedidoEntity } from "../entities/pedido.entity";

@Injectable()
@EntityRepository(PedidoEntity)
export class PedidoRepository extends Repository<PedidoEntity> implements IPedidoRepository {
    
    
    async doSave(pedido: IPedido): Promise<IPedido>{
        const newPedido = this.create(pedido);
        return await this.save(newPedido);
    }
    
    async doUpdate(pedido: IPedido): Promise<IPedido>{
        try {
            let updatePedido = await this.findOneOrFail(pedido.id);
            if (pedido?.observacao) updatePedido.observacao = pedido.observacao
            if (pedido?.formaPagamento) updatePedido.formaPagamento = pedido.formaPagamento
            if (pedido?.cliente) updatePedido.cliente = pedido.cliente
            if (pedido?.produtos) updatePedido.produtos = pedido.produtos
            return await this.save(updatePedido);
        } catch (error) {
            throw error;
        }
    }
    
    async doRemove(id: number): Promise<IPedido>{
        let pedido: PedidoEntity = new PedidoEntity();
        pedido.enable = false;
        this.update(id, pedido);
        return pedido;
    }
    
    async doFindById(id: number): Promise<IPedido>{
        return await this.createQueryBuilder('pedido')
        .leftJoinAndSelect("pedido.cliente", "cliente")
        .leftJoinAndSelect("pedido.produtos", "produtos")
        .where("pedido.id = :id", { id: id })
        .andWhere(`pedido.enable = :enable`,  { enable: true })
        .getOneOrFail();
    }
    
    async doFindAll(): Promise<IPedido[]>{
        return await this.createQueryBuilder('pedido')
        .leftJoinAndSelect("pedido.cliente", "cliente")
        .leftJoinAndSelect("pedido.produtos", "produtos")
        .andWhere(`pedido.enable = :enable`,  { enable: true })
        .orderBy('pedido.createdAt', "DESC")
        .getMany();
    }
}