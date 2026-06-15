import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParticipantStatus } from '@prisma/client';

export class UpdateScheduleParticipantInputParamDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule participant',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;
}

export class UpdateScheduleParticipantInputBodyDto {
  @ApiProperty({
    enum: ParticipantStatus,
    enumName: 'ParticipantStatus',
    example: 'CONFIRMED',
    description: 'The new status of the participant',
    required: false,
  })
  @IsOptional()
  @IsEnum(ParticipantStatus, { message: 'Status must be a valid ParticipantStatus.' })
  status?: ParticipantStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the participant confirmed',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Confirmed at must be a valid ISO date string.' })
  confirmedAt?: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the participant declined',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Declined at must be a valid ISO date string.' })
  declinedAt?: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the participant canceled',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Canceled at must be a valid ISO date string.' })
  canceledAt?: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the participant rescheduled',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Rescheduled at must be a valid ISO date string.' })
  rescheduledAt?: string;

  @ApiProperty({
    example: '2024-01-20T10:00:00Z',
    description: 'The new date and time the participant was rescheduled to',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Rescheduled to must be a valid ISO date string.' })
  rescheduledTo?: string;
}
