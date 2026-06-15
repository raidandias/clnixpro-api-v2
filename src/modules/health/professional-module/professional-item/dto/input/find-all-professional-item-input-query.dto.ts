import { ApiProperty } from '@nestjs/swagger';
import { FormOfPayment } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationInputQueryDto } from 'src/share/dto/pagination-input-query.dto';

export class FindAllProfessionalItemInputQueryDto extends PaginationInputQueryDto {
  @ApiProperty({
    description: 'ID do profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  professionalId?: string;

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
    description: 'Forma de pagamento',
    example: 'FIXED',
    enum: FormOfPayment,
    required: false,
  })
  @IsOptional()
  @IsEnum(FormOfPayment)
  formOfPayment?: FormOfPayment;

  @ApiProperty({
    description: 'Data inicial do pagamento',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startPaymentAt?: string;

  @ApiProperty({
    description: 'Data final do pagamento',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endPaymentAt?: string;
}
