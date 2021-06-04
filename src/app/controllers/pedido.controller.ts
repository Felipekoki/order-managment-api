import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Inject, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { IEmailService } from "src/domain/email/interfaces/service/email.service.interface";
import { DoCreatePedidoDto } from "src/domain/pedido/dtos/do-create-pedido.dto.request";
import { DoRemovePedidoResponseDto } from "src/domain/pedido/dtos/do-remove-pedido.dto.response";
import { DoUpdatePedidoDto } from "src/domain/pedido/dtos/do-update-pedido.dto.request";
import { IPedido } from "src/domain/pedido/interfaces/entities/pedido.entity.interface";
import { IPedidoService } from "src/domain/pedido/interfaces/services/pedido.service.interface";
import { IReportService } from "src/domain/report/service/report.service.interface";
import { EntityNotFoundError } from "typeorm";

@ApiTags('Pedido')
@Controller('pedidos')
export class PedidoController {
    constructor(
        @Inject("IPedidoService") private appService: IPedidoService,
        @Inject("IEmailService") private emailService: IEmailService,
        @Inject("IReportService") private reportService: IReportService,
    ) { }


    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() createDto: DoCreatePedidoDto): Promise<IPedido> {
        try {
            return await this.appService.save(createDto);
        } catch (error) {
           throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() updateDto: DoUpdatePedidoDto): Promise<IPedido> {
        try {
            return await this.appService.update(updateDto);
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Get(':id')
    async findOne(@Param('id') id): Promise<IPedido> {
        try {
            return await this.appService.findById(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Get()
    async findAll(): Promise<IPedido[]> {
        try {
            return await this.appService.findAll();
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Delete(':id')
    async remove(@Param('id') id): Promise<DoRemovePedidoResponseDto> {
        try {
            return await this.appService.remove(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Post(':id/sendmail')
    async sendMail(@Param('id') id) {
        try {
            const pedido = await this.appService.findById(id);
            await this.emailService.sendEmail(pedido);
        } catch (error) {
           throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=report.pdf')
    @ApiParam({ name: 'id', type: 'number' })
    @Post(':id/report')
    async report(@Param('id') id) {
        try {
            const pedido = await this.appService.findById(id);
            return await this.reportService.getPdf(pedido); 
        } catch (error) {
           throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}