import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class FindAllBenefitInputQueryDto {
  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Basic Health',
    description: 'Partial match for the name of the benefit',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1, description: 'Page number', required: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Page is required.' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page', required: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage: number;
}
