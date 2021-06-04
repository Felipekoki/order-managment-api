import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoRepository } from "src/infrastructure/sqldb/repositories/produto.repository";
import { DoCreateProdutoDto } from "../dtos/do-create-produto.dto.request";
import { DoRemoveProdutoResponseDto } from "../dtos/do-remove-produto.dto.response";
import { DoUpdateProdutoDto } from "../dtos/do-update-produto.dto.request";
import { IProduto } from "../interfaces/entities/produto.entity.interface";
import { IProdutoRepository } from "../interfaces/repositories/produto.repository.interface";
import { IProdutoService } from "../interfaces/services/produto.service.interface";
import { Produto } from "../models/produto.model";


@Injectable()
export class ProdutoService implements IProdutoService {

  constructor(@InjectRepository(ProdutoRepository) private produtoRepository: IProdutoRepository) { }


  async save(pedido: DoCreateProdutoDto): Promise<IProduto>{
    let newProduto = new Produto();
    newProduto.nome = pedido.nome;
    newProduto.cor = pedido.cor;
    newProduto.tamanho = pedido.tamanho;
    newProduto.valor = pedido.valor;
    return await this.produtoRepository.doSave(newProduto);
  }

  async update(pedido: DoUpdateProdutoDto): Promise<IProduto>{
    let updateProduto = new Produto();
    updateProduto.id = pedido.id;
    updateProduto.nome = pedido.nome;
    updateProduto.cor = pedido.cor;
    updateProduto.tamanho = pedido.tamanho;
    updateProduto.valor = pedido.valor;
    return await this.produtoRepository.doUpdate(updateProduto);
  }

  async remove(id: number): Promise<DoRemoveProdutoResponseDto>{
    const produto = await this.produtoRepository.doRemove(id); 
    return new DoRemoveProdutoResponseDto(produto.nome, "Was successfully removed");
  }

  async findById(id: number): Promise<IProduto>{
    return await this.produtoRepository.doFindById(id)
  }

  async findAll(): Promise<IProduto[]>{
    return await this.produtoRepository.doFindAll()
  }

}
