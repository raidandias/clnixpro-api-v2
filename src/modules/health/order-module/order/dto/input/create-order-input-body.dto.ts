import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum } from 'class-validator';

export class CreateOrderInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The patient associated with the order.',
  })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Patient ID is required.' })
  patientId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The health insurance associated with the order.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Health Insurance ID must be a string.' })
  @IsUUID(4, { message: 'Health Insurance ID must be a valid UUID.' })
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
}
