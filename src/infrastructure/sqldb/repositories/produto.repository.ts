import { Injectable } from "@nestjs/common";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { IProdutoRepository } from "src/domain/produto/interfaces/repositories/produto.repository.interface";
import { EntityDuplicateException } from "src/domain/utils/exceptions/entityDuplicateException";
import { EntityRepository, Repository } from "typeorm";
import { ProdutoEntity } from "../entities/produto.entity";

@Injectable()
@EntityRepository(ProdutoEntity)
export class ProdutoRepository extends Repository<ProdutoEntity> implements IProdutoRepository {
    
    
    async doSave(Produto: IProduto): Promise<IProduto>{
        try {
            const newProduto = this.create(Produto);
            return await this.save(newProduto);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY')
                throw new EntityDuplicateException('Client with that document already exists');
            throw error;
        }
    }
    
    async doUpdate(Produto: IProduto): Promise<IProduto>{
        try {
            let updateProduto = await this.findOneOrFail(Produto.id);
            if (Produto?.nome) updateProduto.nome = Produto.nome
            if (Produto?.cor) updateProduto.cor = Produto.cor
            if (Produto?.tamanho) updateProduto.tamanho = Produto.tamanho
            if (Produto?.valor) updateProduto.valor = Produto.valor
            return await this.save(updateProduto);
        } catch (error) {
            throw error;
        }
    }
    
    async doRemove(id: number): Promise<IProduto>{
        let produto: ProdutoEntity = await this.findOneOrFail(id);
        produto.enable = false;
        this.save(produto);
        return produto;
    }
    
    async doFindById(id: number): Promise<IProduto>{
        return await this.findOneOrFail(id);
    }
    
    async doFindAll(): Promise<IProduto[]>{
        return await this.createQueryBuilder('produto')
        .orderBy('produto.nome', "DESC")
        .andWhere(`produto.enable = TRUE`)
        .getMany();
    }
}