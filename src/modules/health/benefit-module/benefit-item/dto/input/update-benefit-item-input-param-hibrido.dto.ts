import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateBenefitItemInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the benefit item',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateBenefitItemInputBodyDto {
  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit item',
    required: false,
  })
  @IsNumber({}, { message: 'Value price must be a number.' })
  @IsOptional()
  valuePrice?: number;

  @ApiProperty({
    example: 0.00,
    description: 'The discount applied to the benefit item',
    required: false,
  })
  @IsNumber({}, { message: 'Discount must be a number.' })
  @IsOptional()
  discount?: number;
}
