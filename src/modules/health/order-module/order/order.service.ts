import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderInputBodyDto } from './dto/input/create-order-input-body.dto';
import { CreateOrderOutputDto } from './dto/output/create-order-output.dto';
import { FindAllOrderInputQueryDto } from './dto/input/find-all-order-input-query.dto';
import { FindAllOrderOutputDto } from './dto/output/find-all-order-output.dto';
import { FindOneOrderInputParamDto } from './dto/input/find-one-order-input-param.dto';
import { FindOneOrderOutputDto } from './dto/output/find-one-order-output.dto';
import { UpdateOrderInputParamDto, UpdateOrderInputBodyDto } from './dto/input/update-order-input-param-hibrido.dto';
import { UpdateOrderOutputDto } from './dto/output/update-order-output.dto';
import { DeleteOrderInputParamDto } from './dto/input/delete-order-input-param.dto';
import { DeleteOrderOutputDto } from './dto/output/delete-order-output.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderInputBodyDto): Promise<CreateOrderOutputDto> {
    return this.prisma.order.create({ data: dto as any });
  }

  async findAll(query: FindAllOrderInputQueryDto): Promise<FindAllOrderOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.order.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.order.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderInputParamDto): Promise<FindOneOrderOutputDto> {
    const item = await this.prisma.order.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Order not found');
    return item;
  }

  async update(param: UpdateOrderInputParamDto, body: UpdateOrderInputBodyDto): Promise<UpdateOrderOutputDto> {
    const item = await this.prisma.order.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Order not found');
    return this.prisma.order.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteOrderInputParamDto): Promise<DeleteOrderOutputDto> {
    const item = await this.prisma.order.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Order not found');
    return this.prisma.order.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
