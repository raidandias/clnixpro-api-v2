import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateItemHealthInsuranceInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemHealthInsuranceInputBodyDto {
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
  itemId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The health insurance ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Health Insurance ID must be a valid UUID.' })
  @IsOptional()
  healthInsuranceId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'The item catalog ID associated with the health insurance item.',
    required: false,
  })
  @IsUUID(4, { message: 'Item Catalog ID must be a valid UUID.' })
  @IsOptional()
  itemCatalogId?: string;

  @ApiProperty({
    example: 100.76,
    description: 'The payment value for the health insurance item.',
    required: false,
  })
  @IsOptional()
  paymentValue?: number;

  @ApiProperty({
    example: '2024-02-02',
    description: 'The payment value for the health insurance item.',
    required: false,
  })
  @IsOptional()
  deletedAt?: Date;
}
