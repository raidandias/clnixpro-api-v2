import { Controller, Get, Query, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { DashboardFilterInputQueryDto } from './dto/input/dashboard-filter-input-query.dto';
import { ScheduleMetricsOutputDto } from './dto/output/schedule-metrics-output.dto';
import { FinancialMetricsOutputDto } from './dto/output/financial-metrics-output.dto';
import { OrderMetricsOutputDto } from './dto/output/order-metrics-output.dto';
import { PatientMetricsOutputDto } from './dto/output/patient-metrics-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Dashboard')
@Controller('api/dashboard')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/v1/schedules')
  @ApiOperation({
    summary: 'Métricas de agendamentos',
    description: 'Totais por status e série diária para gráficos. Filtrar por startDate / endDate.',
  })
  @ApiResponse({ status: 200, type: ScheduleMetricsOutputDto })
  @ApiCommonResponses()
  scheduleMetrics(
    @Query(new ValidationPipe({ transform: true })) query: DashboardFilterInputQueryDto,
  ): Promise<ScheduleMetricsOutputDto> {
    return this.dashboardService.scheduleMetrics(query);
  }

  @Get('/v1/financial')
  @ApiOperation({
    summary: 'Métricas financeiras',
    description: 'Contas a receber e a pagar (total, pago, pendente, vencido) + série mensal.',
  })
  @ApiResponse({ status: 200, type: FinancialMetricsOutputDto })
  @ApiCommonResponses()
  financialMetrics(
    @Query(new ValidationPipe({ transform: true })) query: DashboardFilterInputQueryDto,
  ): Promise<FinancialMetricsOutputDto> {
    return this.dashboardService.financialMetrics(query);
  }

  @Get('/v1/orders')
  @ApiOperation({
    summary: 'Métricas de pedidos',
    description: 'Totais por status e série mensal para gráficos.',
  })
  @ApiResponse({ status: 200, type: OrderMetricsOutputDto })
  @ApiCommonResponses()
  orderMetrics(
    @Query(new ValidationPipe({ transform: true })) query: DashboardFilterInputQueryDto,
  ): Promise<OrderMetricsOutputDto> {
    return this.dashboardService.orderMetrics(query);
  }

  @Get('/v1/patients')
  @ApiOperation({
    summary: 'Métricas de pacientes',
    description: 'Total de pacientes ativos, novos no período e série mensal para gráficos.',
  })
  @ApiResponse({ status: 200, type: PatientMetricsOutputDto })
  @ApiCommonResponses()
  patientMetrics(
    @Query(new ValidationPipe({ transform: true })) query: DashboardFilterInputQueryDto,
  ): Promise<PatientMetricsOutputDto> {
    return this.dashboardService.patientMetrics(query);
  }
}
