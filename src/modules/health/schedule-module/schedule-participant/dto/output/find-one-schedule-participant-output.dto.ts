import { ApiProperty } from '@nestjs/swagger';
import { ParticipantStatus } from '@prisma/client';

export class FindOneScheduleParticipantOutputDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule participant',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the schedule',
  })
  scheduleId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the user',
  })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'The ID of the patient',
    nullable: true,
  })
  patientId: string | null;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440004',
    description: 'The ID of the professional',
    nullable: true,
  })
  professionalId: string | null;

  @ApiProperty({
    example: false,
    description: 'Indicates if the participant is the host',
  })
  isHost: boolean;

  @ApiProperty({
    enum: ParticipantStatus,
    enumName: 'ParticipantStatus',
    example: 'PENDING',
    description: 'The status of the participant',
  })
  status: ParticipantStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the participant confirmed',
    nullable: true,
  })
  confirmedAt: Date | null;

  @ApiProperty({
    example: null,
    description: 'The date and time the participant declined',
    nullable: true,
  })
  declinedAt: Date | null;

  @ApiProperty({
    example: null,
    description: 'The date and time the participant canceled',
    nullable: true,
  })
  canceledAt: Date | null;

  @ApiProperty({
    example: null,
    description: 'The date and time the participant rescheduled',
    nullable: true,
  })
  rescheduledAt: Date | null;

  @ApiProperty({
    example: null,
    description: 'The new date and time the participant was rescheduled to',
    nullable: true,
  })
  rescheduledTo: Date | null;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the record was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the record was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time the record was deleted',
    nullable: true,
  })
  deletedAt: Date | null;
}
