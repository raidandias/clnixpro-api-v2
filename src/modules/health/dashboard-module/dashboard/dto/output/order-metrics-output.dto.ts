import { ApiProperty } from '@nestjs/swagger';

export class OrderByMonthDto {
  @ApiProperty({ example: '2024-01', description: 'Mês de referência (YYYY-MM)' })
  month: string;

  @ApiProperty({ example: 30, description: 'Quantidade de pedidos no mês' })
  count: number;
}

export class OrderMetricsOutputDto {
  @ApiProperty({ example: 350, description: 'Total de pedidos no período' })
  total: number;

  @ApiProperty({ example: 50, description: 'Pedidos aguardando' })
  waiting: number;

  @ApiProperty({ example: 270, description: 'Pedidos confirmados' })
  confirmed: number;

  @ApiProperty({ example: 30, description: 'Pedidos cancelados' })
  canceled: number;

  @ApiProperty({ type: [OrderByMonthDto], description: 'Série mensal para gráfico' })
  byMonth: OrderByMonthDto[];
}
