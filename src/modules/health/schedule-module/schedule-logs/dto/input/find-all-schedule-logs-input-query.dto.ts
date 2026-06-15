import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllScheduleLogsInputQueryDto {
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
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Filter by professional ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  professionalId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Filter by schedule ID',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsUUID(4, { message: 'Schedule ID must be a valid UUID.' })
  scheduleId?: string;

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
