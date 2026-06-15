import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ScheduleStatus } from '@prisma/client';

export class CreateScheduleInputBodyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The ID of the account (injected by interceptor)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the host user',
  })
  @IsNotEmpty({ message: 'Host user ID is required.' })
  @IsString({ message: 'Host user ID must be a string.' })
  @IsUUID(4, { message: 'Host user ID must be a valid UUID.' })
  hostUserId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the host professional',
  })
  @IsNotEmpty({ message: 'Host professional ID is required.' })
  @IsString({ message: 'Host professional ID must be a string.' })
  @IsUUID(4, { message: 'Host professional ID must be a valid UUID.' })
  hostProfessionalId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'The ID of the patient',
  })
  @IsNotEmpty({ message: 'Patient ID is required.' })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  patientId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440004',
    description: 'The ID of the item',
  })
  @IsNotEmpty({ message: 'Item ID is required.' })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  itemId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440005',
    description: 'The ID of the item catalog',
  })
  @IsNotEmpty({ message: 'Item catalog ID is required.' })
  @IsString({ message: 'Item catalog ID must be a string.' })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  itemCatalogId: string;

  @ApiProperty({
    enum: ScheduleStatus,
    enumName: 'ScheduleStatus',
    example: 'WAITING',
    description: 'The status of the schedule',
    required: false,
  })
  @IsOptional()
  @IsEnum(ScheduleStatus, { message: 'Status must be a valid ScheduleStatus.' })
  status?: ScheduleStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The start date and time of the schedule',
  })
  @IsNotEmpty({ message: 'Start date is required.' })
  @IsDateString({}, { message: 'Start date must be a valid ISO date string.' })
  startAt: string;

  @ApiProperty({
    example: '2024-01-15T11:00:00Z',
    description: 'The end date and time of the schedule',
  })
  @IsNotEmpty({ message: 'End date is required.' })
  @IsDateString({}, { message: 'End date must be a valid ISO date string.' })
  endAt: string;
}
