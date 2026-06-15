import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalItemCatalogOutputDto } from './professional-item-catalog.output.dto';
import { FormOfPayment } from '@prisma/client';
import { FindOneItemCatalogServiceOutputDto } from 'src/modules/health/item-module/item-catalog-service/dto/output/find-one-item-catalog-service-output.dto';
import { FindOneItemExamOutputDto } from 'src/modules/health/item-module/item-exam/dto/output/find-one-item-exam-output.dto';
import { OmitType } from '@nestjs/swagger';
import { BaseProfessionalItemOutputDto } from './base-professional-item-output.dto';

export class CreateProfessionalItemOutputDto extends OmitType(
  BaseProfessionalItemOutputDto,
  ['updatedAt', 'deletedAt'] as const,
) {
  @ApiProperty({
    description: 'ID do item do profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  professionalId: string;

  @ApiProperty({
    description: 'Catálogo do item associado ao profissional',
    type: [FindOneItemCatalogServiceOutputDto],
  })
  itemCatalogs?: [FindOneItemCatalogServiceOutputDto];

  @ApiProperty({
    description: 'Forma de pagamento',
    example: 'FIXED',
    enum: FormOfPayment,
  })
  formOfPayment: FormOfPayment;

  @ApiProperty({
    description: 'Valor do pagamento',
    example: '100.00',
  })
  valuePayment: string;

  @ApiProperty({
    description: 'Valor da porcentagem (máximo é 100%, default é 0.0)',
    example: '75.50',
  })
  percentageValue: string;

  @ApiProperty({
    description: 'Data do pagamento',
    example: '2024-01-01T00:00:00.000Z',
  })
  paymentAt: Date;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
