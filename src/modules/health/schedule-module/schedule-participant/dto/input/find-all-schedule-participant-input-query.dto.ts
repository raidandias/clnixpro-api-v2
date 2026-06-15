import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParticipantStatus } from '@prisma/client';

export class FindAllScheduleParticipantInputQueryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Filter by schedule ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsUUID(4, { message: 'Schedule ID must be a valid UUID.' })
  scheduleId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Filter by user ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  userId?: string;

  @ApiProperty({
    enum: ParticipantStatus,
    enumName: 'ParticipantStatus',
    example: 'PENDING',
    description: 'Filter by participant status',
    required: false,
  })
  @IsOptional()
  @IsEnum(ParticipantStatus, { message: 'Status must be a valid ParticipantStatus.' })
  status?: ParticipantStatus;

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
