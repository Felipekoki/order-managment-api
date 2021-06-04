import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DoCreateProdutoDto{
    @ApiProperty()
    @IsString()
    nome: string;
    @ApiProperty()
    @IsString()
    cor: string;
    @ApiProperty()
    tamanho: string;
    @ApiProperty()
    @IsOptional()
    valor: number; 
}