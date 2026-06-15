import { ApiProperty } from '@nestjs/swagger';

export class FinancialGroupDto {
  @ApiProperty({ example: 15000.0, description: 'Valor total (R$)' })
  total: number;

  @ApiProperty({ example: 12000.0, description: 'Valor já pago (R$)' })
  paid: number;

  @ApiProperty({ example: 2000.0, description: 'Valor a vencer (R$)' })
  pending: number;

  @ApiProperty({ example: 1000.0, description: 'Valor vencido e não pago (R$)' })
  overdue: number;
}

export class FinancialByMonthDto {
  @ApiProperty({ example: '2024-01', description: 'Mês de referência (YYYY-MM)' })
  month: string;

  @ApiProperty({ example: 5000.0, description: 'Total a receber no mês (R$)' })
  receivable: number;

  @ApiProperty({ example: 3000.0, description: 'Total a pagar no mês (R$)' })
  payable: number;
}

export class FinancialMetricsOutputDto {
  @ApiProperty({ type: FinancialGroupDto, description: 'Contas a receber' })
  receivable: FinancialGroupDto;

  @ApiProperty({ type: FinancialGroupDto, description: 'Contas a pagar' })
  payable: FinancialGroupDto;

  @ApiProperty({ example: 9000.0, description: 'Saldo: recebido - pago (R$)' })
  balance: number;

  @ApiProperty({ type: [FinancialByMonthDto], description: 'Série mensal para gráfico' })
  byMonth: FinancialByMonthDto[];
}
