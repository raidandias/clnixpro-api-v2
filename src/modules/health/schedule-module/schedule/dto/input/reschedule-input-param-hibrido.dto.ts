import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RescheduleInputParamDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do agendamento a ser remarcado',
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}

export class RescheduleInputBodyDto {
  @ApiProperty({
    description: 'Nova data/hora de início sugerida pelo paciente',
    example: '2024-02-10T14:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  rescheduledTo: string;

  @ApiProperty({
    required: false,
    description: 'Nova data de início do agendamento (se secretaria já confirmar o novo horário)',
    example: '2024-02-10T14:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  newStartAt?: string;

  @ApiProperty({
    required: false,
    description: 'Nova data de fim do agendamento',
    example: '2024-02-10T15:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  newEndAt?: string;

  @ApiProperty({
    required: false,
    description: 'Observação sobre a remarcação',
    example: 'Paciente solicitou horário no período da tarde',
  })
  @IsOptional()
  @IsString()
  observation?: string;
}
