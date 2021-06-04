import { Injectable } from "@nestjs/common";
import { PDFService } from "@t00nday/nestjs-pdf";
import * as moment from 'moment';
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IReportService } from "../service/report.service.interface";

@Injectable()
export class ReportService implements IReportService {
    
    constructor(private pdfService: PDFService){}

    async getPdf(pedido: IPedido): Promise<any> {        
        let pedidoTotal = 0;
        pedido.produtos.forEach(prod => pedidoTotal += prod.valor)
        return await this.pdfService.toBuffer(
            './order',
            {
                viewportSize: {
                    height: 10,
                    width: 20
                },
                locals:{
                    pedidoId: pedido.id,
                    pedidoObs: pedido.observacao,
                    pedidoData: moment(pedido.createdAt).format('L'),
                    clienteNome: pedido.cliente.nome,
                    clienteCPF: pedido.cliente.cpf,
                    clienteEmail: pedido.cliente.email,
                    clienteSexo: pedido.cliente.sexo,
                    produtoList: pedido.produtos,
                    pedidoTotal: 'R$' + pedidoTotal
                }
            }
        ).toPromise()
    }
}
