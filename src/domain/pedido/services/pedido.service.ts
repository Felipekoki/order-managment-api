import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "src/domain/cliente/models/cliente.model";
import { Produto } from "src/domain/produto/models/produto.model";
import { PedidoRepository } from "src/infrastructure/sqldb/repositories/pedido.repository";
import { DoCreatePedidoDto } from "../dtos/do-create-pedido.dto.request";
import { DoRemovePedidoResponseDto } from "../dtos/do-remove-pedido.dto.response";
import { DoUpdatePedidoDto } from "../dtos/do-update-pedido.dto.request";
import { IPedido } from "../interfaces/entities/pedido.entity.interface";
import { IPedidoRepository } from "../interfaces/repositories/pedido.repository.interface";
import { IPedidoService } from "../interfaces/services/pedido.service.interface";
import { Pedido } from "../models/pedido.model";



@Injectable()
export class PedidoService implements IPedidoService {

  constructor(@InjectRepository(PedidoRepository) private pedidoRepository: IPedidoRepository) { }

  async save(pedido: DoCreatePedidoDto): Promise<IPedido>{   
    let newPedido = new Pedido();
    newPedido.observacao = pedido.observacao;
    newPedido.formaPagamento = pedido.formaPagamento;
    newPedido.produtos = [];
    for(let item of pedido.produtoIds){
      let produto = new Produto();
      produto.id = item;
      newPedido.produtos.push(produto);
    }
    let cliente = new Cliente();
    cliente.id = pedido.clientId;    
    newPedido.cliente = cliente;
    return await this.pedidoRepository.doSave(newPedido);
  }

  async update(pedido: DoUpdatePedidoDto): Promise<IPedido>{
    let updatePedido = new Pedido();
    updatePedido.id = pedido.id;
    updatePedido.observacao = pedido.observacao;
    updatePedido.formaPagamento = pedido.formaPagamento;
    
    if(pedido.clientId != null){
      let cliente = new Cliente();
      cliente.id = pedido.clientId;
      updatePedido.cliente = cliente;
    }
    
    if(pedido.produtoIds){
      updatePedido.produtos = [];
      for(let item of pedido.produtoIds){
        let produto = new Produto();
        produto.id = item;
        updatePedido.produtos.push(produto);
      }
    }

    return await this.pedidoRepository.doUpdate(updatePedido);
  }

  async remove(id: number): Promise<DoRemovePedidoResponseDto> { 
    const pedido = await this.pedidoRepository.doRemove(id); 
    return new DoRemovePedidoResponseDto(pedido.id, "Was successfully removed");
  }

  async findById(id: number): Promise<IPedido>{
    return await this.pedidoRepository.doFindById(id)
  }

  async findAll(): Promise<IPedido[]>{
    return await this.pedidoRepository.doFindAll()
  }

}
