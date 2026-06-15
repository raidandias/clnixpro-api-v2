import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ScheduleStatus } from '@prisma/client';

export class UpdateScheduleInputParamDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;
}

export class UpdateScheduleInputBodyDto {
  @ApiProperty({
    enum: ScheduleStatus,
    enumName: 'ScheduleStatus',
    example: 'CONFIRMED',
    description: 'The new status of the schedule',
    required: false,
  })
  @IsOptional()
  @IsEnum(ScheduleStatus, { message: 'Status must be a valid ScheduleStatus.' })
  status?: ScheduleStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The new start date and time of the schedule',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Start date must be a valid ISO date string.' })
  startAt?: string;

  @ApiProperty({
    example: '2024-01-15T11:00:00Z',
    description: 'The new end date and time of the schedule',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'End date must be a valid ISO date string.' })
  endAt?: string;
}
