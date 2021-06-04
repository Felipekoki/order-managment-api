import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class DoUpdateProdutoDto{
    @ApiProperty()
    @IsNumber()
    readonly id: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly nome: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly cor: string;
    @ApiProperty()
    @IsOptional()
    readonly tamanho: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly valor: number; 
}