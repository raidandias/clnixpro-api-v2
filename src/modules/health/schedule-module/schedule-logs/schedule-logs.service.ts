import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';

import { CreateScheduleLogsInputBodyDto } from './dto/input/create-schedule-logs-input-body.dto';
import { CreateScheduleLogsOutputDto } from './dto/output/create-schedule-logs-output.dto';
import { FindAllScheduleLogsInputQueryDto } from './dto/input/find-all-schedule-logs-input-query.dto';
import { FindAllScheduleLogsOutputDto } from './dto/output/find-all-schedule-logs-output.dto';
import { FindOneScheduleLogsInputParamDto } from './dto/input/find-one-schedule-logs-input-param.dto';
import { FindOneScheduleLogsOutputDto } from './dto/output/find-one-schedule-logs-output.dto';
import { UpdateScheduleLogsInputParamDto, UpdateScheduleLogsInputBodyDto } from './dto/input/update-schedule-logs-input-param-hibrido.dto';
import { UpdateScheduleLogsOutputDto } from './dto/output/update-schedule-logs-output.dto';
import { DeleteScheduleLogsInputParamDto } from './dto/input/delete-schedule-logs-input-param.dto';
import { DeleteScheduleLogsOutputDto } from './dto/output/delete-schedule-logs-output.dto';

@Injectable()
export class ScheduleLogsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateScheduleLogsInputBodyDto): Promise<CreateScheduleLogsOutputDto> {
    return this.prisma.scheduleLogs.create({ data: dto as any });
  }

  async findAll(query: FindAllScheduleLogsInputQueryDto): Promise<FindAllScheduleLogsOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };

    const [data, totalItems] = await Promise.all([
      this.prisma.scheduleLogs.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.scheduleLogs.count({ where }),
    ]);

    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneScheduleLogsInputParamDto): Promise<FindOneScheduleLogsOutputDto> {
    const item = await this.prisma.scheduleLogs.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleLog not found');
    return item;
  }

  async update(
    param: UpdateScheduleLogsInputParamDto,
    body: UpdateScheduleLogsInputBodyDto,
  ): Promise<UpdateScheduleLogsOutputDto> {
    const item = await this.prisma.scheduleLogs.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleLog not found');
    return this.prisma.scheduleLogs.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteScheduleLogsInputParamDto): Promise<DeleteScheduleLogsOutputDto> {
    const item = await this.prisma.scheduleLogs.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleLog not found');
    return this.prisma.scheduleLogs.update({
      where: { id: param.id },
      data: { deletedAt: new Date() },
    });
  }
}
