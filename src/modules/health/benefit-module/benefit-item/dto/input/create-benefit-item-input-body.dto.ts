import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBenefitItemInputBodyDto {
  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit item',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The benefit ID associated with the benefit item',
  })
  @IsString({ message: 'Benefit ID must be a string.' })
  @IsUUID(4, { message: 'Benefit ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Benefit ID is required.' })
  benefitId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item ID associated with the benefit item',
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The item catalog ID associated with the benefit item',
  })
  @IsString({ message: 'Item Catalog ID must be a string.' })
  @IsUUID(4, { message: 'Item Catalog ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item Catalog ID is required.' })
  itemCatalogId: string;

  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit item',
  })
  @IsNumber({}, { message: 'Value price must be a number.' })
  @IsNotEmpty({ message: 'Value price is required.' })
  valuePrice: number;

  @ApiProperty({
    example: 0.00,
    description: 'The discount applied to the benefit item',
    required: false,
  })
  @IsNumber({}, { message: 'Discount must be a number.' })
  @IsOptional()
  discount?: number;
}
