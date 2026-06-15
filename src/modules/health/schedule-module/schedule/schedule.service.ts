import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { ScheduleStatus } from '@prisma/client';

import { CreateScheduleInputBodyDto } from './dto/input/create-schedule-input-body.dto';
import { CreateScheduleOutputDto } from './dto/output/create-schedule-output.dto';
import { FindAllScheduleInputQueryDto } from './dto/input/find-all-schedule-input-query.dto';
import { FindAllScheduleOutputDto } from './dto/output/find-all-schedule-output.dto';
import { FindOneScheduleInputParamDto } from './dto/input/find-one-schedule-input-param.dto';
import { FindOneScheduleOutputDto } from './dto/output/find-one-schedule-output.dto';
import { UpdateScheduleInputParamDto, UpdateScheduleInputBodyDto } from './dto/input/update-schedule-input-param-hibrido.dto';
import { UpdateScheduleOutputDto } from './dto/output/update-schedule-output.dto';
import { DeleteScheduleInputParamDto } from './dto/input/delete-schedule-input-param.dto';
import { DeleteScheduleOutputDto } from './dto/output/delete-schedule-output.dto';
import { RescheduleInputParamDto, RescheduleInputBodyDto } from './dto/input/reschedule-input-param-hibrido.dto';
import { PreScheduleActionOutputDto } from './dto/output/pre-schedule-action-output.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  private readonly scheduleInclude = {
    hostProfessional: { select: { id: true, ocupation: true, user: { select: { id: true, name: true, email: true } } } },
    patient: { select: { id: true, user: { select: { id: true, name: true, email: true } } } },
  } as const;

  async create(dto: CreateScheduleInputBodyDto): Promise<CreateScheduleOutputDto> {
    return this.prisma.schedule.create({ data: dto as any, include: this.scheduleInclude });
  }

  async findAll(query: FindAllScheduleInputQueryDto): Promise<FindAllScheduleOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };

    const [data, totalItems] = await Promise.all([
      this.prisma.schedule.findMany({
        where,
        include: this.scheduleInclude,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.schedule.count({ where }),
    ]);

    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneScheduleInputParamDto): Promise<FindOneScheduleOutputDto> {
    const item = await this.prisma.schedule.findUnique({
      where: { id: param.id, deletedAt: null },
      include: this.scheduleInclude,
    });
    if (!item) throw new NotFoundException('Schedule not found');
    return item;
  }

  async update(param: UpdateScheduleInputParamDto, body: UpdateScheduleInputBodyDto): Promise<UpdateScheduleOutputDto> {
    const item = await this.prisma.schedule.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Schedule not found');
    return this.prisma.schedule.update({ where: { id: param.id }, data: body, include: this.scheduleInclude });
  }

  async delete(param: DeleteScheduleInputParamDto): Promise<DeleteScheduleOutputDto> {
    const item = await this.prisma.schedule.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Schedule not found');
    return this.prisma.schedule.update({
      where: { id: param.id },
      data: { deletedAt: new Date() },
      include: this.scheduleInclude,
    });
  }

  // ─── Pré-agendamento: ações de confirmação ──────────────────────

  async confirm(scheduleId: string): Promise<PreScheduleActionOutputDto> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId, deletedAt: null },
    });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    if (schedule.status === ScheduleStatus.CONFIRMED)
      throw new BadRequestException('Agendamento já está confirmado');
    if (schedule.status === ScheduleStatus.CANCELED)
      throw new BadRequestException('Não é possível confirmar um agendamento cancelado');

    const now = new Date();

    const [updatedSchedule, participant] = await this.prisma.$transaction([
      this.prisma.schedule.update({
        where: { id: scheduleId },
        data: { status: ScheduleStatus.CONFIRMED },
      }),
      this.prisma.scheduleParticipant.upsert({
        where: { scheduleId_userId: { scheduleId, userId: schedule.hostUserId } },
        create: {
          scheduleId,
          userId: schedule.hostUserId,
          patientId: schedule.patientId,
          status: 'CONFIRMED',
          confirmedAt: now,
        },
        update: {
          status: 'CONFIRMED',
          confirmedAt: now,
          declinedAt: null,
          rescheduledAt: null,
        },
      }),
    ]);

    await this.prisma.scheduleLogs.create({
      data: {
        accountId: schedule.accountId,
        professionalId: schedule.hostProfessionalId,
        scheduleId,
        description: `Pré-agendamento confirmado em ${now.toISOString()}`,
      },
    });

    return { ...updatedSchedule, participant };
  }

  async decline(scheduleId: string): Promise<PreScheduleActionOutputDto> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId, deletedAt: null },
    });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    if (schedule.status === ScheduleStatus.CANCELED)
      throw new BadRequestException('Agendamento já está cancelado');

    const now = new Date();

    const [updatedSchedule, participant] = await this.prisma.$transaction([
      this.prisma.schedule.update({
        where: { id: scheduleId },
        data: { status: ScheduleStatus.CANCELED },
      }),
      this.prisma.scheduleParticipant.upsert({
        where: { scheduleId_userId: { scheduleId, userId: schedule.hostUserId } },
        create: {
          scheduleId,
          userId: schedule.hostUserId,
          patientId: schedule.patientId,
          status: 'DECLINED',
          declinedAt: now,
        },
        update: {
          status: 'DECLINED',
          declinedAt: now,
          confirmedAt: null,
          rescheduledAt: null,
        },
      }),
    ]);

    await this.prisma.scheduleLogs.create({
      data: {
        accountId: schedule.accountId,
        professionalId: schedule.hostProfessionalId,
        scheduleId,
        description: `Pré-agendamento recusado pelo paciente em ${now.toISOString()}`,
      },
    });

    return { ...updatedSchedule, participant };
  }

  async reschedule(
    param: RescheduleInputParamDto,
    body: RescheduleInputBodyDto,
  ): Promise<PreScheduleActionOutputDto> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    if (schedule.status === ScheduleStatus.CANCELED)
      throw new BadRequestException('Não é possível remarcar um agendamento cancelado');

    const now = new Date();
    const rescheduledTo = new Date(body.rescheduledTo);

    const scheduleUpdateData: any = {};
    if (body.newStartAt) scheduleUpdateData.startAt = new Date(body.newStartAt);
    if (body.newEndAt) scheduleUpdateData.endAt = new Date(body.newEndAt);

    const [updatedSchedule, participant] = await this.prisma.$transaction([
      this.prisma.schedule.update({
        where: { id: param.id },
        data: { status: ScheduleStatus.WAITING, ...scheduleUpdateData },
      }),
      this.prisma.scheduleParticipant.upsert({
        where: { scheduleId_userId: { scheduleId: param.id, userId: schedule.hostUserId } },
        create: {
          scheduleId: param.id,
          userId: schedule.hostUserId,
          patientId: schedule.patientId,
          status: 'RESCHEDULED',
          rescheduledAt: now,
          rescheduledTo,
        },
        update: {
          status: 'RESCHEDULED',
          rescheduledAt: now,
          rescheduledTo,
          confirmedAt: null,
          declinedAt: null,
        },
      }),
    ]);

    const logDescription = body.observation
      ? `Remarcação solicitada para ${rescheduledTo.toISOString()}. Obs: ${body.observation}`
      : `Remarcação solicitada para ${rescheduledTo.toISOString()}`;

    await this.prisma.scheduleLogs.create({
      data: {
        accountId: schedule.accountId,
        professionalId: schedule.hostProfessionalId,
        scheduleId: param.id,
        description: logDescription,
      },
    });

    return { ...updatedSchedule, participant };
  }
}
