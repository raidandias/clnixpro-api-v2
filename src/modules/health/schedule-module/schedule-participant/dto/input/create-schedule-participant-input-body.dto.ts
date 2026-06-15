import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParticipantStatus } from '@prisma/client';

export class CreateScheduleParticipantInputBodyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the schedule',
  })
  @IsNotEmpty({ message: 'Schedule ID is required.' })
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsUUID(4, { message: 'Schedule ID must be a valid UUID.' })
  scheduleId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the user',
  })
  @IsNotEmpty({ message: 'User ID is required.' })
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'The ID of the patient (optional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  patientId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440004',
    description: 'The ID of the professional (optional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  professionalId?: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the participant is the host',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isHost must be a boolean.' })
  isHost?: boolean;

  @ApiProperty({
    enum: ParticipantStatus,
    enumName: 'ParticipantStatus',
    example: 'PENDING',
    description: 'The status of the participant',
    required: false,
  })
  @IsOptional()
  @IsEnum(ParticipantStatus, { message: 'Status must be a valid ParticipantStatus.' })
  status?: ParticipantStatus;
}
