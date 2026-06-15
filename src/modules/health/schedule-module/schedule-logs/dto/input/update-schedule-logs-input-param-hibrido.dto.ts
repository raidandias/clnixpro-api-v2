import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateScheduleLogsInputParamDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule log',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;
}

export class UpdateScheduleLogsInputBodyDto {
  @ApiProperty({
    example: 'Updated log description for the session.',
    description: 'The updated description of the schedule log entry',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;
}
