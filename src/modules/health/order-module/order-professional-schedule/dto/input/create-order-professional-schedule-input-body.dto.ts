import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateOrderProfessionalScheduleInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order professional schedule.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order professional schedule.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order professional associated with this schedule.',
  })
  @IsString({ message: 'Order Professional ID must be a string.' })
  @IsUUID(4, { message: 'Order Professional ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order Professional ID is required.' })
  orderProfessionalId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The schedule associated with this order professional schedule.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsUUID(4, { message: 'Schedule ID must be a valid UUID.' })
  @IsOptional()
  sheduleId?: string;

  @ApiProperty({
    example: '2024-01-15T09:00:00Z',
    description: 'The start date and time of the schedule.',
  })
  @IsDateString({}, { message: 'Start At must be a valid date string.' })
  @IsNotEmpty({ message: 'Start At is required.' })
  startAt: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the schedule.',
  })
  @IsDateString({}, { message: 'End At must be a valid date string.' })
  @IsNotEmpty({ message: 'End At is required.' })
  endAt: string;
}
