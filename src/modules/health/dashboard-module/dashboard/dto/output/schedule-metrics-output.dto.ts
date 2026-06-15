import { ApiProperty } from '@nestjs/swagger';

export class ScheduleByDayDto {
  @ApiProperty({ example: '2024-01-15', description: 'Data (YYYY-MM-DD)' })
  date: string;

  @ApiProperty({ example: 12, description: 'Total de agendamentos no dia' })
  total: number;

  @ApiProperty({ example: 8, description: 'Agendamentos confirmados' })
  confirmed: number;

  @ApiProperty({ example: 2, description: 'Agendamentos cancelados' })
  canceled: number;

  @ApiProperty({ example: 1, description: 'Agendamentos concluídos' })
  completed: number;

  @ApiProperty({ example: 1, description: 'Agendamentos em espera' })
  waiting: number;
}

export class ScheduleMetricsOutputDto {
  @ApiProperty({ example: 120, description: 'Total de agendamentos no período' })
  total: number;

  @ApiProperty({ example: 10, description: 'Aguardando confirmação' })
  waiting: number;

  @ApiProperty({ example: 80, description: 'Confirmados' })
  confirmed: number;

  @ApiProperty({ example: 20, description: 'Cancelados' })
  canceled: number;

  @ApiProperty({ example: 10, description: 'Concluídos' })
  completed: number;

  @ApiProperty({ example: 66.7, description: 'Taxa de confirmação (%)' })
  confirmationRate: number;

  @ApiProperty({ type: [ScheduleByDayDto], description: 'Série por dia para gráfico' })
  byDay: ScheduleByDayDto[];
}
