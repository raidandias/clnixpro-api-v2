import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderItemInputBodyDto } from './dto/input/create-order-item-input-body.dto';
import { CreateOrderItemOutputDto } from './dto/output/create-order-item-output.dto';
import { FindAllOrderItemInputQueryDto } from './dto/input/find-all-order-item-input-query.dto';
import { FindAllOrderItemOutputDto } from './dto/output/find-all-order-item-output.dto';
import { FindOneOrderItemInputParamDto } from './dto/input/find-one-order-item-input-param.dto';
import { FindOneOrderItemOutputDto } from './dto/output/find-one-order-item-output.dto';
import { UpdateOrderItemInputParamDto, UpdateOrderItemInputBodyDto } from './dto/input/update-order-item-input-param-hibrido.dto';
import { UpdateOrderItemOutputDto } from './dto/output/update-order-item-output.dto';
import { DeleteOrderItemInputParamDto } from './dto/input/delete-order-item-input-param.dto';
import { DeleteOrderItemOutputDto } from './dto/output/delete-order-item-output.dto';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderItemInputBodyDto): Promise<CreateOrderItemOutputDto> {
    return this.prisma.orderItem.create({ data: dto as any });
  }

  async findAll(query: FindAllOrderItemInputQueryDto): Promise<FindAllOrderItemOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.orderItem.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.orderItem.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderItemInputParamDto): Promise<FindOneOrderItemOutputDto> {
    const item = await this.prisma.orderItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderItem not found');
    return item;
  }

  async update(param: UpdateOrderItemInputParamDto, body: UpdateOrderItemInputBodyDto): Promise<UpdateOrderItemOutputDto> {
    const item = await this.prisma.orderItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderItem not found');
    return this.prisma.orderItem.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteOrderItemInputParamDto): Promise<DeleteOrderItemOutputDto> {
    const item = await this.prisma.orderItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderItem not found');
    return this.prisma.orderItem.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
