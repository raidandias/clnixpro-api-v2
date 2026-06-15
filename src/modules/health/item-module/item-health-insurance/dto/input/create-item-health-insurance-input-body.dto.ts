import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateItemHealthInsuranceInputBodyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The account ID associated with the item.',
    required: false,
  })
  accountId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The item ID associated with the health insurance item.',
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'The item catalog ID associated with the health insurance item.',
  })
  @IsUUID(4, { message: 'Item Catalog ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item Catalog ID is required.' })
  itemCatalogId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The health insurance ID associated with the item.',
  })
  @IsUUID(4, { message: 'Health Insurance ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Health Insurance ID is required.' })
  healthInsuranceId: string;

  @ApiProperty({
    example: 100.87,
    description: 'The payment value for the health insurance item.',
  })
  @IsNumber({}, { message: 'Payment value must be a number.' })
  paymentValue: number;
}

export class CreateItemHealthInsuranceInputBodyArrayDto {
  @ApiProperty({ type: [CreateItemHealthInsuranceInputBodyDto] })
  data: CreateItemHealthInsuranceInputBodyDto[];
}
