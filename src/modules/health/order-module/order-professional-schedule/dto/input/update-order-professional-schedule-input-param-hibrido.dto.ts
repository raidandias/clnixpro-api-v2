import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class UpdateOrderProfessionalScheduleInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order professional schedule.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderProfessionalScheduleInputBodyDto {
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
    required: false,
  })
  @IsDateString({}, { message: 'Start At must be a valid date string.' })
  @IsOptional()
  startAt?: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the schedule.',
    required: false,
  })
  @IsDateString({}, { message: 'End At must be a valid date string.' })
  @IsOptional()
  endAt?: string;
}
