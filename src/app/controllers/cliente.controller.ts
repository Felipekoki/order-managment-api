import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { DoCreateClienteDto } from "src/domain/cliente/dtos/do-create-cliente.dto.request";
import { DoRemoveClienteResponseDto } from "src/domain/cliente/dtos/do-remove-cliente.dto.response";
import { DoUpdateClienteDto } from "src/domain/cliente/dtos/do-update-cliente.dto.request";
import { ICliente } from "src/domain/cliente/interfaces/entities/client.entity.interface";
import { IClienteService } from "src/domain/cliente/interfaces/services/cliente.service.interface";
import { EntityDuplicateException } from "src/domain/utils/exceptions/entityDuplicateException";
import { InvalidDocumentException } from "src/domain/utils/exceptions/invalidDocumentException";
import { EntityNotFoundError } from "typeorm";


@ApiTags('Cliente')
@Controller('clientes')
export class ClienteController {
    constructor(
        @Inject("IClienteService") private appService: IClienteService,
    ) { }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() createDto: DoCreateClienteDto): Promise<ICliente> {
        try {
            return await this.appService.save(createDto);
        } catch (error) {
            if (error instanceof EntityDuplicateException || error instanceof InvalidDocumentException)
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() updateDto: DoUpdateClienteDto): Promise<ICliente>{
        try {
            return await this.appService.update(updateDto);
        } catch (error) {
            if (error instanceof EntityDuplicateException || error instanceof InvalidDocumentException)
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Get(':id')
    async findOne(@Param('id') id): Promise<ICliente> {
        try {
            return await this.appService.findById(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new HttpException("Client not found.", HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Get()
    async filter(): Promise<ICliente[]> {
        try {
            return await this.appService.findAll();
        } catch (error) {
            console.log(error);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Delete(':id')
    async remove(@Param('id') id): Promise<DoRemoveClienteResponseDto> {
        try {
            return await this.appService.remove(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}