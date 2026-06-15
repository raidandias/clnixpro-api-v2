import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class FindAllBenefitItemInputQueryDto {
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
    required: false,
  })
  @IsString({ message: 'Benefit ID must be a string.' })
  @IsUUID(4, { message: 'Benefit ID must be a valid UUID.' })
  @IsOptional()
  benefitId?: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item ID associated with the benefit item',
    required: false,
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId?: string;

  @ApiProperty({ example: 1, description: 'Page number', required: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Page is required.' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page', required: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage: number;
}
