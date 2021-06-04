import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { FormaPagamentoTypeEnum } from "../models/enum/forma-pagamento.type.enum";

export class DoUpdatePedidoDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly observacao: string;
    @ApiProperty({enum: FormaPagamentoTypeEnum})
    @IsEnum(FormaPagamentoTypeEnum)
    @IsOptional()
    readonly formaPagamento: FormaPagamentoTypeEnum;
    @ApiProperty()
    @IsOptional()
    readonly clientId: number;
    @ApiProperty({required: false, isArray: true, type: 'number'})    
    @IsOptional()
    readonly produtoIds: number[]
}