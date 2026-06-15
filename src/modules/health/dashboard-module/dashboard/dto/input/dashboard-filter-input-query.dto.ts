import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class DashboardFilterInputQueryDto {
  @ApiProperty({
    required: false,
    example: '2024-01-01',
    description: 'Data inicial do período (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    required: false,
    example: '2024-12-31',
    description: 'Data final do período (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    required: false,
    description: 'Injetado automaticamente pelo AccountInterceptor',
  })
  @IsOptional()
  @IsUUID(4)
  accountId?: string;
}
