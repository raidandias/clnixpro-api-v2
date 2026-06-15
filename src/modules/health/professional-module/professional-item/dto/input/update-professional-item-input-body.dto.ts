import { ApiProperty } from '@nestjs/swagger';
import { FormOfPayment } from '@prisma/client';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsUUID,
  Max,
} from 'class-validator';

export class UpdateProfessionalItemInputBodyDto {
  @ApiProperty({
    description: 'ID do item',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @ApiProperty({
    description: 'ID do catálogo de item',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  itemCatalogId?: string;

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
    required: false,
  })
  @IsOptional()
  @IsEnum(FormOfPayment)
  formOfPayment?: FormOfPayment;

  @ApiProperty({
    description: 'Valor do pagamento',
    example: '100.00',
    required: false,
  })
  @IsOptional()
  @IsDecimal()
  valuePayment?: string;

  @ApiProperty({
    description: 'Valor da porcentagem (máximo é 100%, default é 0.0)',
    example: '75.50',
    default: '0.0',
  })
  @IsDecimal()
  @IsOptional()
  percentageValue?: string;

  @ApiProperty({
    description: 'Data do pagamento',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  paymentAt?: string;
}
