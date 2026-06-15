import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemHealthInsuranceOutputDto } from './find-one-item-health-insurance-output.dto';

export class CreateItemHealthInsuranceOutputDto extends FindOneItemHealthInsuranceOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier for the ItemHealthInsurance.',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The account ID associated with the item.',
  })
  accountId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The item ID associated with the health insurance item.',
  })
  itemId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'The item catalog ID associated with the health insurance item.',
  })
  itemCatalogId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The health insurance ID associated with the item.',
  })
  healthInsuranceId: string;

  @ApiProperty({
    example: 100.87,
    description: 'The payment value for the health insurance item.',
  })
  paymentValue: number;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the item was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the item was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the item was deleted.',
  })
  deletedAt: Date;
}
