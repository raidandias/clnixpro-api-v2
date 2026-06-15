import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class FindAllOrderInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The patient associated with the order.',
    required: false,
  })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsOptional()
  patientId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The health insurance associated with the order.',
    required: false,
  })
  @IsString({ message: 'Health Insurance ID must be a string.' })
  @IsOptional()
  healthInsuranceId?: string;

  @ApiProperty({
    example: OrderStatus.WAITING,
    description: 'The status of the order.',
    enum: OrderStatus,
    required: false,
  })
  @IsEnum(OrderStatus, { message: 'Status must be a valid OrderStatus.' })
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({
    example: 1,
    description: 'Page number.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  perPage?: number;
}
