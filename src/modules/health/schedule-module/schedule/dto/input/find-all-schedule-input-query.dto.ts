import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ScheduleStatus } from '@prisma/client';

export class FindAllScheduleInputQueryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Filter by account ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Filter by host professional ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Host professional ID must be a string.' })
  @IsUUID(4, { message: 'Host professional ID must be a valid UUID.' })
  hostProfessionalId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'Filter by patient ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  patientId?: string;

  @ApiProperty({
    enum: ScheduleStatus,
    enumName: 'ScheduleStatus',
    example: 'WAITING',
    description: 'Filter by schedule status',
    required: false,
  })
  @IsOptional()
  @IsEnum(ScheduleStatus, { message: 'Status must be a valid ScheduleStatus.' })
  status?: ScheduleStatus;

  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Page must be an integer.' })
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Per page must be an integer.' })
  perPage?: number;
}
