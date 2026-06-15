import { ApiProperty } from '@nestjs/swagger';

export class FindOneScheduleLogsOutputDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule log',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the account',
  })
  accountId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the professional',
  })
  professionalId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'The ID of the schedule',
  })
  scheduleId: string;

  @ApiProperty({
    example: 'Patient arrived on time and the session went smoothly.',
    description: 'The description of the schedule log entry',
  })
  description: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the log was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the log was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time the log was deleted',
    nullable: true,
  })
  deletedAt: Date | null;
}
