import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import * as moment from 'moment';
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IEmailService } from "../interfaces/service/email.service.interface";

@Injectable()
export class EmailService implements IEmailService {
    
    constructor(private mailerService: MailerService){}

    async sendEmail(pedido: IPedido){
        
        let pedidoTotal = 0;
        pedido.produtos.forEach(prod => pedidoTotal += prod.valor)

        try {        
            this.mailerService.sendMail    
            await this.mailerService.sendMail({
                to: pedido.cliente.email,
                subject: 'Pedidos',
                template: './html',
                context: {
                    pedidoId: pedido.id,
                    pedidoObs: pedido.observacao,
                    pedidoData: moment(pedido.createdAt).format('L'),
                    clienteNome: pedido.cliente.nome,
                    clienteCPF: pedido.cliente.cpf,
                    clienteEmail: pedido.cliente.email,
                    clienteSexo: pedido.cliente.sexo,
                    produtoList: pedido.produtos,
                    pedidoTotal: 'R$' + pedidoTotal
                  },
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}
