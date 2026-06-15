import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FindAllItemHealthInsuranceInputQueryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier for the ItemHealthInsurance.',
    required: false,
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The account ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The item ID associated with the health insurance item.',
    required: false,
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'The item catalog ID associated with the health insurance item.',
    required: false,
  })
  @IsUUID(4, { message: 'Item Catalog ID must be a valid UUID.' })
  @IsOptional()
  itemCatalogId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The health insurance ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Health Insurance ID must be a valid UUID.' })
  @IsOptional()
  healthInsuranceId: string;

  @ApiProperty({
    example: 100.76,
    description: 'The payment value for the health insurance item.',
    required: false,
  })
  @IsOptional()
  paymentValue: string;

  @ApiProperty({
    example: '2024-07-11T12:00:00Z',
    description: 'The date and time when the item was created.',
    required: false,
  })
  @IsString({ message: 'Created at must be a valid date string.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2024-07-11T12:00:00Z',
    description: 'The date and time when the item was last updated.',
    required: false,
  })
  @IsString({ message: 'Updated at must be a valid date string.' })
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage?: string;
}
