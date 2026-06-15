import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateOrderPaymentCurrencyInputBodyDto } from './dto/input/create-order-payment-currency-input-body.dto';
import { CreateOrderPaymentCurrencyOutputDto } from './dto/output/create-order-payment-currency-output.dto';
import { FindAllOrderPaymentCurrencyInputQueryDto } from './dto/input/find-all-order-payment-currency-input-query.dto';
import { FindAllOrderPaymentCurrencyOutputDto } from './dto/output/find-all-order-payment-currency-output.dto';
import { FindOneOrderPaymentCurrencyInputParamDto } from './dto/input/find-one-order-payment-currency-input-param.dto';
import { FindOneOrderPaymentCurrencyOutputDto } from './dto/output/find-one-order-payment-currency-output.dto';
import { UpdateOrderPaymentCurrencyInputParamDto, UpdateOrderPaymentCurrencyInputBodyDto } from './dto/input/update-order-payment-currency-input-param-hibrido.dto';
import { UpdateOrderPaymentCurrencyOutputDto } from './dto/output/update-order-payment-currency-output.dto';
import { DeleteOrderPaymentCurrencyInputParamDto } from './dto/input/delete-order-payment-currency-input-param.dto';
import { DeleteOrderPaymentCurrencyOutputDto } from './dto/output/delete-order-payment-currency-output.dto';

@Injectable()
export class OrderPaymentCurrencyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderPaymentCurrencyInputBodyDto): Promise<CreateOrderPaymentCurrencyOutputDto> {
    const result = await this.prisma.orderPaymentCurrency.create({
      data: {
        ...dto,
        paymentAt: new Date(dto.paymentAt),
      } as any,
    });
    return {
      ...result,
      valueReceived: Number(result.valueReceived),
      value: Number(result.value),
    };
  }

  async findAll(query: FindAllOrderPaymentCurrencyInputQueryDto): Promise<FindAllOrderPaymentCurrencyOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.orderPaymentCurrency.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.orderPaymentCurrency.count({ where }),
    ]);
    const mappedData = data.map((item) => ({
      ...item,
      valueReceived: Number(item.valueReceived),
      value: Number(item.value),
    }));
    return { data: mappedData, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneOrderPaymentCurrencyInputParamDto): Promise<FindOneOrderPaymentCurrencyOutputDto> {
    const item = await this.prisma.orderPaymentCurrency.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPaymentCurrency not found');
    return {
      ...item,
      valueReceived: Number(item.valueReceived),
      value: Number(item.value),
    };
  }

  async update(param: UpdateOrderPaymentCurrencyInputParamDto, body: UpdateOrderPaymentCurrencyInputBodyDto): Promise<UpdateOrderPaymentCurrencyOutputDto> {
    const item = await this.prisma.orderPaymentCurrency.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPaymentCurrency not found');
    const result = await this.prisma.orderPaymentCurrency.update({
      where: { id: param.id },
      data: {
        ...body,
        paymentAt: body.paymentAt ? new Date(body.paymentAt) : undefined,
      },
    });
    return {
      ...result,
      valueReceived: Number(result.valueReceived),
      value: Number(result.value),
    };
  }

  async delete(param: DeleteOrderPaymentCurrencyInputParamDto): Promise<DeleteOrderPaymentCurrencyOutputDto> {
    const item = await this.prisma.orderPaymentCurrency.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('OrderPaymentCurrency not found');
    const result = await this.prisma.orderPaymentCurrency.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return {
      ...result,
      valueReceived: Number(result.valueReceived),
      value: Number(result.value),
    };
  }
}
