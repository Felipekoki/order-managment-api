import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { ClienteController } from './app/controllers/cliente.controller';
import { PedidoController } from './app/controllers/pedido.controller';
import { ProdutoController } from './app/controllers/produto.controller';
import { ClienteService } from './domain/cliente/services/cliente.service';
import { EmailService } from './domain/email/services/email.service';
import { PedidoService } from './domain/pedido/services/pedido.service';
import { ProdutoService } from './domain/produto/services/produto.service';
import { ReportService } from './domain/report/services/report.service';
import { ClienteRepository } from './infrastructure/sqldb/repositories/cliente.repository';
import { PedidoRepository } from './infrastructure/sqldb/repositories/pedido.repository';
import { ProdutoRepository } from './infrastructure/sqldb/repositories/produto.repository';
import { MailConfig } from './mailconfig';
import { OrmConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    TypeOrmModule.forFeature([ClienteRepository, PedidoRepository, ProdutoRepository]),
    MailerModule.forRoot(MailConfig),
    PDFModule.register({
      view: {
        root: __dirname + '/domain/assets/templates',
        engine: 'pug'
      }
    })
  ],
  controllers: [ClienteController, PedidoController, ProdutoController],
  providers: [
    { provide: 'IEmailService', useClass: EmailService },
    { provide: 'IReportService', useClass: ReportService },
    { provide: 'IClienteService', useClass: ClienteService },
    { provide: 'IClienteRepository', useClass: ClienteRepository },
    { provide: 'IPedidoService', useClass: PedidoService },
    { provide: 'IPedidoRepository', useClass: PedidoRepository },
    { provide: 'IProdutoService', useClass: ProdutoService },
    { provide: 'IProdutoRepository', useClass: ProdutoRepository },
  ], 
})
export class AppModule {}
