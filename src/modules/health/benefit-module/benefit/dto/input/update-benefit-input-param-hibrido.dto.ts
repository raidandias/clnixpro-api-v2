import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateBenefitInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the benefit',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateBenefitInputBodyDto {
  @ApiProperty({
    example: 'Basic Health Plan',
    description: 'The name of the benefit',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'A comprehensive health benefit plan for patients',
    description: 'The description of the benefit',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit',
    required: false,
  })
  @IsNumber({}, { message: 'Value price must be a number.' })
  @IsOptional()
  valuePrice?: number;
}
