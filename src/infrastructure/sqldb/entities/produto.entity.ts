import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./pedido.entity";

@Entity('produto')
export class ProdutoEntity implements IProduto{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    cor: string;
    @Column()
    tamanho: string;
    @Column()
    valor: number;
    @ManyToMany(() => PedidoEntity, pedido => pedido.produtos)
    @JoinTable()
    pedidos: IPedido[];
    @Column({default: true, select: false})
    enable: boolean;

    @BeforeUpdate()
    @BeforeInsert()
    async removeDecimal() {
        this.valor = this.valor*1000;
    }

    @AfterLoad()
    async addDecimal() {
        this.valor = this.valor/1000;
    }
}