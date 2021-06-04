import { IProduto } from "../entities/produto.entity.interface";

export interface IProdutoRepository 
{
    doSave(produto: IProduto): Promise<IProduto>;
    doUpdate(produto: IProduto): Promise<IProduto>;
    doRemove(id: number): Promise<IProduto>;
    doFindById(id: number): Promise<IProduto>;
    doFindAll(): Promise<IProduto[]>;
}