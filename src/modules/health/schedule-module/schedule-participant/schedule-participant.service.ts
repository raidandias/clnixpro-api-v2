import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';

import { CreateScheduleParticipantInputBodyDto } from './dto/input/create-schedule-participant-input-body.dto';
import { CreateScheduleParticipantOutputDto } from './dto/output/create-schedule-participant-output.dto';
import { FindAllScheduleParticipantInputQueryDto } from './dto/input/find-all-schedule-participant-input-query.dto';
import { FindAllScheduleParticipantOutputDto } from './dto/output/find-all-schedule-participant-output.dto';
import { FindOneScheduleParticipantInputParamDto } from './dto/input/find-one-schedule-participant-input-param.dto';
import { FindOneScheduleParticipantOutputDto } from './dto/output/find-one-schedule-participant-output.dto';
import { UpdateScheduleParticipantInputParamDto, UpdateScheduleParticipantInputBodyDto } from './dto/input/update-schedule-participant-input-param-hibrido.dto';
import { UpdateScheduleParticipantOutputDto } from './dto/output/update-schedule-participant-output.dto';
import { DeleteScheduleParticipantInputParamDto } from './dto/input/delete-schedule-participant-input-param.dto';
import { DeleteScheduleParticipantOutputDto } from './dto/output/delete-schedule-participant-output.dto';

@Injectable()
export class ScheduleParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateScheduleParticipantInputBodyDto): Promise<CreateScheduleParticipantOutputDto> {
    return this.prisma.scheduleParticipant.create({ data: dto });
  }

  async findAll(query: FindAllScheduleParticipantInputQueryDto): Promise<FindAllScheduleParticipantOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };

    const [data, totalItems] = await Promise.all([
      this.prisma.scheduleParticipant.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.scheduleParticipant.count({ where }),
    ]);

    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneScheduleParticipantInputParamDto): Promise<FindOneScheduleParticipantOutputDto> {
    const item = await this.prisma.scheduleParticipant.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleParticipant not found');
    return item;
  }

  async update(
    param: UpdateScheduleParticipantInputParamDto,
    body: UpdateScheduleParticipantInputBodyDto,
  ): Promise<UpdateScheduleParticipantOutputDto> {
    const item = await this.prisma.scheduleParticipant.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleParticipant not found');
    return this.prisma.scheduleParticipant.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteScheduleParticipantInputParamDto): Promise<DeleteScheduleParticipantOutputDto> {
    const item = await this.prisma.scheduleParticipant.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('ScheduleParticipant not found');
    return this.prisma.scheduleParticipant.update({
      where: { id: param.id },
      data: { deletedAt: new Date() },
    });
  }
}
