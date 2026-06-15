import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { DashboardFilterInputQueryDto } from './dto/input/dashboard-filter-input-query.dto';
import { ScheduleMetricsOutputDto } from './dto/output/schedule-metrics-output.dto';
import { FinancialMetricsOutputDto } from './dto/output/financial-metrics-output.dto';
import { OrderMetricsOutputDto } from './dto/output/order-metrics-output.dto';
import { PatientMetricsOutputDto } from './dto/output/patient-metrics-output.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  private buildDateRange(startDate?: string, endDate?: string) {
    const range: { gte?: Date; lte?: Date } = {};
    if (startDate) range.gte = new Date(startDate);
    if (endDate) range.lte = new Date(`${endDate}T23:59:59.999Z`);
    return range;
  }

  private toMonth(date: Date): string {
    return date.toISOString().slice(0, 7);
  }

  private toDay(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  async scheduleMetrics(query: DashboardFilterInputQueryDto): Promise<ScheduleMetricsOutputDto> {
    const { startDate, endDate, accountId } = query;
    const dateRange = this.buildDateRange(startDate, endDate);

    const schedules = await this.prisma.schedule.findMany({
      where: {
        deletedAt: null,
        ...(accountId && { accountId }),
        ...(Object.keys(dateRange).length && { startAt: dateRange }),
      },
      select: { status: true, startAt: true },
    });

    const counts = { waiting: 0, confirmed: 0, canceled: 0, completed: 0 };
    const byDayMap = new Map<string, { total: number; confirmed: number; canceled: number; completed: number; waiting: number }>();

    for (const s of schedules) {
      counts[s.status.toLowerCase() as keyof typeof counts]++;

      const day = this.toDay(s.startAt);
      if (!byDayMap.has(day)) byDayMap.set(day, { total: 0, confirmed: 0, canceled: 0, completed: 0, waiting: 0 });
      const entry = byDayMap.get(day)!;
      entry.total++;
      entry[s.status.toLowerCase() as keyof typeof entry]++;
    }

    const total = schedules.length;
    const confirmationRate = total > 0 ? Math.round((counts.confirmed / total) * 1000) / 10 : 0;

    const byDay = Array.from(byDayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }));

    return { total, ...counts, confirmationRate, byDay };
  }

  async financialMetrics(query: DashboardFilterInputQueryDto): Promise<FinancialMetricsOutputDto> {
    const { startDate, endDate, accountId } = query;
    const dateRange = this.buildDateRange(startDate, endDate);
    const now = new Date();

    const baseWhere = {
      deletedAt: null,
      ...(accountId && { accountId }),
      ...(Object.keys(dateRange).length && { createdAt: dateRange }),
    };

    const [receivables, payables] = await Promise.all([
      this.prisma.invoiceReceivable.findMany({
        where: baseWhere,
        select: { valueTotal: true, paymentAt: true, dueAt: true, createdAt: true },
      }),
      this.prisma.invoicePayable.findMany({
        where: baseWhere,
        select: { valueTotal: true, paymentAt: true, dueAt: true, createdAt: true },
      }),
    ]);

    const aggregateGroup = (items: { valueTotal: any; paymentAt: Date | null; dueAt: Date }[]) => {
      let total = 0, paid = 0, pending = 0, overdue = 0;
      for (const i of items) {
        const val = Number(i.valueTotal);
        total += val;
        if (i.paymentAt) {
          paid += val;
        } else if (i.dueAt < now) {
          overdue += val;
        } else {
          pending += val;
        }
      }
      return { total: +total.toFixed(2), paid: +paid.toFixed(2), pending: +pending.toFixed(2), overdue: +overdue.toFixed(2) };
    };

    const receivable = aggregateGroup(receivables);
    const payable = aggregateGroup(payables);
    const balance = +(receivable.paid - payable.paid).toFixed(2);

    const byMonthMap = new Map<string, { receivable: number; payable: number }>();

    for (const r of receivables) {
      const m = this.toMonth(r.createdAt);
      if (!byMonthMap.has(m)) byMonthMap.set(m, { receivable: 0, payable: 0 });
      byMonthMap.get(m)!.receivable += Number(r.valueTotal);
    }
    for (const p of payables) {
      const m = this.toMonth(p.createdAt);
      if (!byMonthMap.has(m)) byMonthMap.set(m, { receivable: 0, payable: 0 });
      byMonthMap.get(m)!.payable += Number(p.valueTotal);
    }

    const byMonth = Array.from(byMonthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({
        month,
        receivable: +v.receivable.toFixed(2),
        payable: +v.payable.toFixed(2),
      }));

    return { receivable, payable, balance, byMonth };
  }

  async orderMetrics(query: DashboardFilterInputQueryDto): Promise<OrderMetricsOutputDto> {
    const { startDate, endDate, accountId } = query;
    const dateRange = this.buildDateRange(startDate, endDate);

    const orders = await this.prisma.order.findMany({
      where: {
        deletedAt: null,
        ...(accountId && { accountId }),
        ...(Object.keys(dateRange).length && { createdAt: dateRange }),
      },
      select: { status: true, createdAt: true },
    });

    const counts = { waiting: 0, confirmed: 0, canceled: 0 };
    const byMonthMap = new Map<string, number>();

    for (const o of orders) {
      counts[o.status.toLowerCase() as keyof typeof counts]++;

      const m = this.toMonth(o.createdAt);
      byMonthMap.set(m, (byMonthMap.get(m) ?? 0) + 1);
    }

    const byMonth = Array.from(byMonthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    return { total: orders.length, ...counts, byMonth };
  }

  async patientMetrics(query: DashboardFilterInputQueryDto): Promise<PatientMetricsOutputDto> {
    const { startDate, endDate, accountId } = query;
    const dateRange = this.buildDateRange(startDate, endDate);

    const [total, newPatients] = await Promise.all([
      this.prisma.patient.count({
        where: { deletedAt: null, ...(accountId && { accountId }) },
      }),
      this.prisma.patient.findMany({
        where: {
          deletedAt: null,
          ...(accountId && { accountId }),
          ...(Object.keys(dateRange).length && { createdAt: dateRange }),
        },
        select: { createdAt: true },
      }),
    ]);

    const byMonthMap = new Map<string, number>();
    for (const p of newPatients) {
      const m = this.toMonth(p.createdAt);
      byMonthMap.set(m, (byMonthMap.get(m) ?? 0) + 1);
    }

    const byMonth = Array.from(byMonthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    return { total, newInPeriod: newPatients.length, byMonth };
  }
}
