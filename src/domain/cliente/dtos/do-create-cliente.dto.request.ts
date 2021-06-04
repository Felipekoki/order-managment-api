import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { SexoTypeEnum } from "../models/enum/sexo.type.enum";

export class DoCreateClienteDto{
    @ApiProperty()
    @IsString()
    readonly nome: string;
    @ApiProperty()
    @IsString()
    readonly cpf: string;
    @ApiProperty({enum: SexoTypeEnum})
    @IsEnum(SexoTypeEnum)
    readonly sexo: SexoTypeEnum;
    @ApiProperty()
    @IsEmail()
    readonly email: string; 
}