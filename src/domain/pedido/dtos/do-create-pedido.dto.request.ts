import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { FormaPagamentoTypeEnum } from "../models/enum/forma-pagamento.type.enum";

export class DoCreatePedidoDto{ 
    @ApiProperty()
    @IsString()
    readonly observacao: string;
    @ApiProperty({enum: FormaPagamentoTypeEnum})
    @IsEnum(FormaPagamentoTypeEnum)
    readonly formaPagamento: FormaPagamentoTypeEnum;
    @ApiProperty()
    readonly clientId: number;
    @ApiProperty({required: false, isArray: true, type: 'number'})  
    readonly produtoIds: number[];
}