import { DoCreateProdutoDto } from "../../dtos/do-create-produto.dto.request";
import { DoRemoveProdutoResponseDto } from "../../dtos/do-remove-produto.dto.response";
import { DoUpdateProdutoDto } from "../../dtos/do-update-produto.dto.request";
import { IProduto } from "../entities/produto.entity.interface";

export interface IProdutoService{
    save(produto: DoCreateProdutoDto): Promise<IProduto>;
    update(produto: DoUpdateProdutoDto): Promise<IProduto>;
    remove(id: number): Promise<DoRemoveProdutoResponseDto>;
    findById(id: number): Promise<IProduto>;
    findAll(): Promise<IProduto[]>;
}



