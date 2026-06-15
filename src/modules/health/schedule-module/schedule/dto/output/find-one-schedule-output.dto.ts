import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus } from '@prisma/client';

export class ScheduleUserOutputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID do usuário' })
  id: string;

  @ApiProperty({ example: 'Dr. João Silva', description: 'Nome completo' })
  name: string;

  @ApiProperty({ example: 'joao.silva@clinica.com', description: 'E-mail' })
  email: string;
}

export class ScheduleProfessionalOutputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003', description: 'ID do profissional' })
  id: string;

  @ApiProperty({ example: 'Cardiologista', description: 'Especialidade / ocupação' })
  ocupation: string;

  @ApiProperty({ type: ScheduleUserOutputDto, description: 'Dados do usuário do profissional' })
  user: ScheduleUserOutputDto;
}

export class SchedulePatientOutputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440004', description: 'ID do paciente' })
  id: string;

  @ApiProperty({ type: ScheduleUserOutputDto, description: 'Dados do usuário do paciente' })
  user: ScheduleUserOutputDto;
}

export class FindOneScheduleOutputDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the account',
  })
  accountId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the host user',
  })
  hostUserId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'The ID of the host professional',
  })
  hostProfessionalId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440004',
    description: 'The ID of the patient',
  })
  patientId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440005',
    description: 'The ID of the item',
  })
  itemId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440006',
    description: 'The ID of the item catalog',
  })
  itemCatalogId: string;

  @ApiProperty({
    enum: ScheduleStatus,
    enumName: 'ScheduleStatus',
    example: 'WAITING',
    description: 'The status of the schedule',
  })
  status: ScheduleStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The start date and time of the schedule',
  })
  startAt: Date;

  @ApiProperty({
    example: '2024-01-15T11:00:00Z',
    description: 'The end date and time of the schedule',
  })
  endAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the schedule was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time the schedule was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time the schedule was deleted',
    nullable: true,
  })
  deletedAt: Date | null;

  @ApiProperty({ type: ScheduleProfessionalOutputDto, description: 'Médico responsável pelo agendamento' })
  hostProfessional: ScheduleProfessionalOutputDto;

  @ApiProperty({ type: SchedulePatientOutputDto, description: 'Paciente do agendamento' })
  patient: SchedulePatientOutputDto;
}
