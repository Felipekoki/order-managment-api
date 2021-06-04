import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SexoTypeEnum } from "../models/enum/sexo.type.enum";

export class DoUpdateClienteDto{
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
    readonly cpf: string;
    @ApiProperty()
    @IsEnum(SexoTypeEnum)
    @IsOptional()
    readonly sexo: SexoTypeEnum;
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    readonly email: string; 
}