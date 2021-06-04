import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { DoCreateProdutoDto } from "src/domain/produto/dtos/do-create-produto.dto.request";
import { DoRemoveProdutoResponseDto } from "src/domain/produto/dtos/do-remove-produto.dto.response";
import { DoUpdateProdutoDto } from "src/domain/produto/dtos/do-update-produto.dto.request";
import { IProduto } from "src/domain/produto/interfaces/entities/produto.entity.interface";
import { IProdutoService } from "src/domain/produto/interfaces/services/produto.service.interface";
import { EntityNotFoundError } from "typeorm";


@ApiTags('Produto')
@Controller('produtos')
export class ProdutoController {
    constructor(
        @Inject("IProdutoService") private appService: IProdutoService,
    ) { }


    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() createDto: DoCreateProdutoDto): Promise<IProduto> {
        try {
            return await this.appService.save(createDto);
        } catch (error) {
           throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() updateDto: DoUpdateProdutoDto): Promise<IProduto> {
        try {
            return await this.appService.update(updateDto);
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: 'number' })
    @Get(':id')
    async findOne(@Param('id') id): Promise<IProduto> {
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
    async findAll(): Promise<IProduto[]> {
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
    async remove(@Param('id') id): Promise<DoRemoveProdutoResponseDto> {
        try {
            return await this.appService.remove(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}