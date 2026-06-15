import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderPaymentInputBodyDto } from './dto/input/create-order-payment-input-body.dto';
import { CreateOrderPaymentOutputDto } from './dto/output/create-order-payment-output.dto';
import { FindAllOrderPaymentInputQueryDto } from './dto/input/find-all-order-payment-input-query.dto';
import { FindAllOrderPaymentOutputDto } from './dto/output/find-all-order-payment-output.dto';
import { FindOneOrderPaymentInputParamDto } from './dto/input/find-one-order-payment-input-param.dto';
import { FindOneOrderPaymentOutputDto } from './dto/output/find-one-order-payment-output.dto';
import { UpdateOrderPaymentInputParamDto, UpdateOrderPaymentInputBodyDto } from './dto/input/update-order-payment-input-param-hibrido.dto';
import { UpdateOrderPaymentOutputDto } from './dto/output/update-order-payment-output.dto';
import { DeleteOrderPaymentInputParamDto } from './dto/input/delete-order-payment-input-param.dto';
import { DeleteOrderPaymentOutputDto } from './dto/output/delete-order-payment-output.dto';

@Injectable()
export class OrderPaymentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderPaymentInputBodyDto): Promise<CreateOrderPaymentOutputDto> {
    const result = await this.prisma.orderPayment.create({
      data: {
        ...dto,
        paymentAt: new Date(dto.paymentAt),
      } as any,
    });
    return {
      ...result,
      valuePayment: Number(result.valuePayment),
      valueDiscount: Number(result.valueDiscount),
      valueTotal: Number(result.valueTotal),
    };
  }

  async findAll(query: FindAllOrderPaymentInputQueryDto): Promise<FindAllOrderPaymentOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.orderPayment.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.orderPayment.count({ where }),
    ]);
    const mappedData = data.map((item) => ({
      ...item,
      valuePayment: Number(item.valuePayment),
      valueDiscount: Number(item.valueDiscount),
      valueTotal: Number(item.valueTotal),
    }));
    return { data: mappedData, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderPaymentInputParamDto): Promise<FindOneOrderPaymentOutputDto> {
    const item = await this.prisma.orderPayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPayment not found');
    return {
      ...item,
      valuePayment: Number(item.valuePayment),
      valueDiscount: Number(item.valueDiscount),
      valueTotal: Number(item.valueTotal),
    };
  }

  async update(param: UpdateOrderPaymentInputParamDto, body: UpdateOrderPaymentInputBodyDto): Promise<UpdateOrderPaymentOutputDto> {
    const item = await this.prisma.orderPayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPayment not found');
    const result = await this.prisma.orderPayment.update({
      where: { id: param.id },
      data: {
        ...body,
        paymentAt: body.paymentAt ? new Date(body.paymentAt) : undefined,
      },
    });
    return {
      ...result,
      valuePayment: Number(result.valuePayment),
      valueDiscount: Number(result.valueDiscount),
      valueTotal: Number(result.valueTotal),
    };
  }

  async delete(param: DeleteOrderPaymentInputParamDto): Promise<DeleteOrderPaymentOutputDto> {
    const item = await this.prisma.orderPayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPayment not found');
    const result = await this.prisma.orderPayment.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return {
      ...result,
      valuePayment: Number(result.valuePayment),
      valueDiscount: Number(result.valueDiscount),
      valueTotal: Number(result.valueTotal),
    };
  }
}
