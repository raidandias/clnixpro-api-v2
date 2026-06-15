import { ApiProperty } from '@nestjs/swagger';
import { FormOfPayment } from '@prisma/client';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
} from 'class-validator';

export class CreateProfessionalItemInputBodyDto {
  @ApiProperty({
    description: 'ID do profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  professionalId: string;

  @ApiProperty({
    description: 'ID do item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @ApiProperty({
    description: 'ID do catálogo de item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  itemCatalogId: string;

  @ApiProperty({
    description: 'ID da conta',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  accountId?: string;

  @ApiProperty({
    description: 'Forma de pagamento',
    example: 'FIXED',
    enum: FormOfPayment,
  })
  @IsNotEmpty()
  @IsEnum(FormOfPayment)
  formOfPayment: FormOfPayment;

  @ApiProperty({
    description: 'Valor do pagamento',
    example: '100.00',
  })
  @IsNotEmpty()
  @IsDecimal()
  valuePayment: string;

  @ApiProperty({
    description: 'Valor da porcentagem (máximo é 100%, default é 0.0)',
    example: '75',
    default: '0.0',
  })
  @IsNotEmpty()
  @IsDecimal()
  percentageValue: string;

  @ApiProperty({
    description: 'Data do pagamento',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  paymentAt: string;
}
