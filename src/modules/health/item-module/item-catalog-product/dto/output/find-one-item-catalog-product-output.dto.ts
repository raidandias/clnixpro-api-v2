import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemOutputDto } from '../../../item/dto/output/find-one-item-output.dto';
import { FindOneHealthInsuranceOutputDto } from 'src/modules/health/health-insurance/dto/output/find-one-health-insurance-output.dto';
import { FindOneItemHealthInsuranceOutputDto } from '../../../item-health-insurance/dto/output/find-one-item-health-insurance-output.dto';

export class FindOneItemCatalogProductOutputDto {
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
    example: '100',
    description: 'The price of the item.',
  })
  price: number;

  @ApiProperty({
    example: '50',
    description: 'The cost price of the item.',
  })
  costPrice: number;

  @ApiProperty({
    example: 'Example Manufacturer',
    description: 'The manufacturer of the item.',
  })
  manufacturer: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'The expiry date of the item.',
  })
  expiryAt: Date;

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
  deletedAt?: Date;

  @ApiProperty({
    example: FindOneItemOutputDto,
    description: 'Item the product.',
    required: false,
  })
  item?: FindOneItemOutputDto;

  @ApiProperty({
    type: [FindOneItemHealthInsuranceOutputDto],
    description: 'health insurance product',
    required: false,
  })
  itemHealthInsurances?: FindOneItemHealthInsuranceOutputDto[];
}
