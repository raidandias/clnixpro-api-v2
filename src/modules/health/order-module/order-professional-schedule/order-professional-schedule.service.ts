import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderProfessionalScheduleInputBodyDto } from './dto/input/create-order-professional-schedule-input-body.dto';
import { CreateOrderProfessionalScheduleOutputDto } from './dto/output/create-order-professional-schedule-output.dto';
import { FindAllOrderProfessionalScheduleInputQueryDto } from './dto/input/find-all-order-professional-schedule-input-query.dto';
import { FindAllOrderProfessionalScheduleOutputDto } from './dto/output/find-all-order-professional-schedule-output.dto';
import { FindOneOrderProfessionalScheduleInputParamDto } from './dto/input/find-one-order-professional-schedule-input-param.dto';
import { FindOneOrderProfessionalScheduleOutputDto } from './dto/output/find-one-order-professional-schedule-output.dto';
import { UpdateOrderProfessionalScheduleInputParamDto, UpdateOrderProfessionalScheduleInputBodyDto } from './dto/input/update-order-professional-schedule-input-param-hibrido.dto';
import { UpdateOrderProfessionalScheduleOutputDto } from './dto/output/update-order-professional-schedule-output.dto';
import { DeleteOrderProfessionalScheduleInputParamDto } from './dto/input/delete-order-professional-schedule-input-param.dto';
import { DeleteOrderProfessionalScheduleOutputDto } from './dto/output/delete-order-professional-schedule-output.dto';

@Injectable()
export class OrderProfessionalScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderProfessionalScheduleInputBodyDto): Promise<CreateOrderProfessionalScheduleOutputDto> {
    return this.prisma.orderProfessionalSchedule.create({
      data: {
        ...dto,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
      } as any,
    });
  }

  async findAll(query: FindAllOrderProfessionalScheduleInputQueryDto): Promise<FindAllOrderProfessionalScheduleOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.orderProfessionalSchedule.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.orderProfessionalSchedule.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderProfessionalScheduleInputParamDto): Promise<FindOneOrderProfessionalScheduleOutputDto> {
    const item = await this.prisma.orderProfessionalSchedule.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessionalSchedule not found');
    return item;
  }

  async update(param: UpdateOrderProfessionalScheduleInputParamDto, body: UpdateOrderProfessionalScheduleInputBodyDto): Promise<UpdateOrderProfessionalScheduleOutputDto> {
    const item = await this.prisma.orderProfessionalSchedule.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessionalSchedule not found');
    return this.prisma.orderProfessionalSchedule.update({
      where: { id: param.id },
      data: {
        ...body,
        startAt: body.startAt ? new Date(body.startAt) : undefined,
        endAt: body.endAt ? new Date(body.endAt) : undefined,
      },
    });
  }

  async delete(param: DeleteOrderProfessionalScheduleInputParamDto): Promise<DeleteOrderProfessionalScheduleOutputDto> {
    const item = await this.prisma.orderProfessionalSchedule.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessionalSchedule not found');
    return this.prisma.orderProfessionalSchedule.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
