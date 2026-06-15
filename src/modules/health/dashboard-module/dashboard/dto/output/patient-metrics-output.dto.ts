import { ApiProperty } from '@nestjs/swagger';

export class PatientByMonthDto {
  @ApiProperty({ example: '2024-01', description: 'Mês de referência (YYYY-MM)' })
  month: string;

  @ApiProperty({ example: 15, description: 'Novos pacientes cadastrados no mês' })
  count: number;
}

export class PatientMetricsOutputDto {
  @ApiProperty({ example: 1200, description: 'Total de pacientes ativos no account' })
  total: number;

  @ApiProperty({ example: 45, description: 'Novos pacientes cadastrados no período' })
  newInPeriod: number;

  @ApiProperty({ type: [PatientByMonthDto], description: 'Série mensal de novos pacientes para gráfico' })
  byMonth: PatientByMonthDto[];
}
