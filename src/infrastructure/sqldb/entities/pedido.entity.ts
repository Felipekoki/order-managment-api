import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { FormaPagamentoTypeEnum } from "src/domain/pedido/models/enum/forma-pagamento.type.enum";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteEntity } from "./cliente.entity";
import { ProdutoEntity } from "./produto.entity";

@Entity('pedido')
export class PedidoEntity implements IPedido{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    observacao: string; 
    @Column({type: 'enum', enum: FormaPagamentoTypeEnum})
    formaPagamento: FormaPagamentoTypeEnum;
    @Column()
    createdAt: Date;
    @Column({default: null, select: false})
    updatedAt: Date;
    @ManyToOne(() => ClienteEntity, (cliente: ICliente) => cliente.pedidos)
    cliente: ICliente;
    @ManyToMany(() => ProdutoEntity, produto => produto.pedidos)
    @JoinTable()
    produtos: IProduto[];
    @Column({default: true})
    enable: boolean;

    @BeforeInsert()
    async setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    async setUpdate() {
        this.updatedAt = new Date();
    }

}