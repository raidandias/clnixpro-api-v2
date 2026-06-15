import { ApiProperty } from '@nestjs/swagger';
import { FormOfPayment } from '@prisma/client';
import { FindOneItemCatalogServiceOutputDto } from 'src/modules/health/item-module/item-catalog-service/dto/output/find-one-item-catalog-service-output.dto';

export class BaseProfessionalItemOutputDto {
  @ApiProperty({
    description: 'ID do item profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do profissional',
    example: '98765432-e89b-12d3-a456-426614174000',
  })
  professionalId: string;

  @ApiProperty({
    description: 'ID do item',
    example: '11223344-e89b-12d3-a456-426614174000',
  })
  itemId: string;

  @ApiProperty({
    description: 'ID do catálogo do item',
    example: '55667788-e89b-12d3-a456-426614174000',
  })
  itemCatalogId: string;

  @ApiProperty({
    description: 'Catálogo do item associado ao profissional',
    type: [FindOneItemCatalogServiceOutputDto],
  })
  itemCatalogs?: [FindOneItemCatalogServiceOutputDto];

  @ApiProperty({
    description: 'Forma de pagamento',
    enum: FormOfPayment,
    example: FormOfPayment.FIXED,
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
    example: '2023-06-15T10:30:00Z',
  })
  paymentAt: Date;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-06-10T08:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2023-06-14T15:45:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do registro (null se não foi excluído)',
    example: null,
  })
  deletedAt: Date | null;
}
