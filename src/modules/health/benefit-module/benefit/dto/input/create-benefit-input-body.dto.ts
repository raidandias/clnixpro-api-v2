import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBenefitInputBodyDto {
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
    example: 'Basic Health Plan',
    description: 'The name of the benefit',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'A comprehensive health benefit plan for patients',
    description: 'The description of the benefit',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit',
  })
  @IsNumber({}, { message: 'Value price must be a number.' })
  @IsNotEmpty({ message: 'Value price is required.' })
  valuePrice: number;
}
