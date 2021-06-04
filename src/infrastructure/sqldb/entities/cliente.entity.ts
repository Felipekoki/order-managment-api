import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { SexoTypeEnum } from "src/domain/cliente/models/enum/sexo.type.enum";
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./pedido.entity";

@Entity('cliente')
export class ClienteEntity implements ICliente{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column({unique: true})
    cpf: string;
    @Column({type: 'enum', enum: SexoTypeEnum})
    sexo: SexoTypeEnum;
    @Column()
    email: string;
    @Column({default: true, select: false})
    enable: boolean;
    @OneToMany(type => PedidoEntity, pedido => pedido.cliente, { eager: true, cascade: true })
    pedidos: IPedido[];
}