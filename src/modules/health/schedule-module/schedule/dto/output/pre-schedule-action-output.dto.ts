import { ApiProperty } from '@nestjs/swagger';
import { ParticipantStatus, ScheduleStatus } from '@prisma/client';

export class ParticipantActionOutputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440010', description: 'ID do participante' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID do agendamento' })
  scheduleId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440004', description: 'ID do paciente', nullable: true })
  patientId: string | null;

  @ApiProperty({
    enum: ParticipantStatus,
    enumName: 'ParticipantStatus',
    example: 'CONFIRMED',
    description: 'Status do participante',
  })
  status: ParticipantStatus;

  @ApiProperty({ example: '2024-01-15T10:30:00Z', nullable: true, description: 'Data/hora da confirmação' })
  confirmedAt: Date | null;

  @ApiProperty({ example: null, nullable: true, description: 'Data/hora da recusa' })
  declinedAt: Date | null;

  @ApiProperty({ example: null, nullable: true, description: 'Data/hora da solicitação de remarcação' })
  rescheduledAt: Date | null;

  @ApiProperty({ example: null, nullable: true, description: 'Data/hora sugerida para remarcação' })
  rescheduledTo: Date | null;
}

export class PreScheduleActionOutputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID do agendamento' })
  id: string;

  @ApiProperty({
    enum: ScheduleStatus,
    enumName: 'ScheduleStatus',
    example: 'CONFIRMED',
    description: 'Novo status do agendamento',
  })
  status: ScheduleStatus;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'Data/hora de início' })
  startAt: Date;

  @ApiProperty({ example: '2024-01-15T11:00:00Z', description: 'Data/hora de fim' })
  endAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00Z', description: 'Última atualização' })
  updatedAt: Date;

  @ApiProperty({ type: ParticipantActionOutputDto, description: 'Registro do participante atualizado' })
  participant: ParticipantActionOutputDto;
}
