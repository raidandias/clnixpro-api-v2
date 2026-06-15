import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderProfessionalInputBodyDto } from './dto/input/create-order-professional-input-body.dto';
import { CreateOrderProfessionalOutputDto } from './dto/output/create-order-professional-output.dto';
import { FindAllOrderProfessionalInputQueryDto } from './dto/input/find-all-order-professional-input-query.dto';
import { FindAllOrderProfessionalOutputDto } from './dto/output/find-all-order-professional-output.dto';
import { FindOneOrderProfessionalInputParamDto } from './dto/input/find-one-order-professional-input-param.dto';
import { FindOneOrderProfessionalOutputDto } from './dto/output/find-one-order-professional-output.dto';
import { UpdateOrderProfessionalInputParamDto, UpdateOrderProfessionalInputBodyDto } from './dto/input/update-order-professional-input-param-hibrido.dto';
import { UpdateOrderProfessionalOutputDto } from './dto/output/update-order-professional-output.dto';
import { DeleteOrderProfessionalInputParamDto } from './dto/input/delete-order-professional-input-param.dto';
import { DeleteOrderProfessionalOutputDto } from './dto/output/delete-order-professional-output.dto';

@Injectable()
export class OrderProfessionalService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderProfessionalInputBodyDto): Promise<CreateOrderProfessionalOutputDto> {
    return this.prisma.orderProfessional.create({ data: dto as any });
  }

  async findAll(query: FindAllOrderProfessionalInputQueryDto): Promise<FindAllOrderProfessionalOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.orderProfessional.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.orderProfessional.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderProfessionalInputParamDto): Promise<FindOneOrderProfessionalOutputDto> {
    const item = await this.prisma.orderProfessional.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessional not found');
    return item;
  }

  async update(param: UpdateOrderProfessionalInputParamDto, body: UpdateOrderProfessionalInputBodyDto): Promise<UpdateOrderProfessionalOutputDto> {
    const item = await this.prisma.orderProfessional.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessional not found');
    return this.prisma.orderProfessional.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteOrderProfessionalInputParamDto): Promise<DeleteOrderProfessionalOutputDto> {
    const item = await this.prisma.orderProfessional.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderProfessional not found');
    return this.prisma.orderProfessional.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
