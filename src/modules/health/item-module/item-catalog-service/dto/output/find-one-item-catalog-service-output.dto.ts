import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogProductOutputDto } from '../../../item-catalog-product/dto/output/find-one-item-catalog-product-output.dto';
import { FindOneItemCatalogExamOutputDto } from '../../../item-catalog-exam/dto/output/find-one-item-catalog-exam-output.dto';
import { FindOneItemOutputDto } from '../../../item/dto/output/find-one-item-output.dto';

export class FindOneItemCatalogServiceOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier for the item.',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
  })
  itemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
  })
  accountId: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
  })
  name: string;

  @ApiProperty({
    example: 'Item Title',
    description: 'The title of the item.',
  })
  title: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
  })
  description: string;

  @ApiProperty({
    example: 100.88,
    description: 'The price of the item.',
  })
  price: number;

  @ApiProperty({
    example: 50.86,
    description: 'The cost price of the item.',
  })
  costPrice: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if the item has a benefit.',
  })
  flagBenefit: boolean;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
  })
  duration: number;

  @ApiProperty({
    example: 'ARMS',
    description: 'The body members related to the item.',
  })
  bodyMembers: string;

  @ApiProperty({
    example: 'Professional observation details.',
    description: 'The observation for professional regarding the item.',
  })
  observationForProfessional: string;

  @ApiProperty({
    example: 'Patient observation details.',
    description: 'The observation for patient regarding the item.',
  })
  observationForPatient: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The creation date of the item.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The last update date of the item.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The deletion date of the item.',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'The related item.',
    type: FindOneItemOutputDto,
  })
  item: FindOneItemOutputDto;

  @ApiProperty({
    description: 'The related item instruments.',
    type: [FindOneItemCatalogProductOutputDto],
  })
  itemInstruments: FindOneItemCatalogProductOutputDto[];

  @ApiProperty({
    description: 'The related item exams.',
    type: [FindOneItemCatalogExamOutputDto],
  })
  itemExams: FindOneItemCatalogExamOutputDto[];
}
