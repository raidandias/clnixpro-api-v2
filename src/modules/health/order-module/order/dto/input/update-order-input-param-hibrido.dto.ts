import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderInputBodyDto {
  @ApiProperty({
    example: OrderStatus.CONFIRMED,
    description: 'The status of the order.',
    enum: OrderStatus,
    required: false,
  })
  @IsEnum(OrderStatus, { message: 'Status must be a valid OrderStatus.' })
  @IsOptional()
  status?: OrderStatus;

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
}
