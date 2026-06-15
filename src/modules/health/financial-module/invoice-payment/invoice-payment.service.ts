import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateInvoicePaymentInputBodyDto } from './dto/input/create-invoice-payment-input-body.dto';
import { CreateInvoicePaymentOutputDto } from './dto/output/create-invoice-payment-output.dto';
import { FindAllInvoicePaymentInputQueryDto } from './dto/input/find-all-invoice-payment-input-query.dto';
import { FindAllInvoicePaymentOutputDto } from './dto/output/find-all-invoice-payment-output.dto';
import { FindOneInvoicePaymentInputParamDto } from './dto/input/find-one-invoice-payment-input-param.dto';
import { FindOneInvoicePaymentOutputDto } from './dto/output/find-one-invoice-payment-output.dto';
import { UpdateInvoicePaymentInputBodyDto, UpdateInvoicePaymentInputParamDto } from './dto/input/update-invoice-payment-input-param-hibrido.dto';
import { UpdateInvoicePaymentOutputDto } from './dto/output/update-invoice-payment-output.dto';
import { DeleteInvoicePaymentInputParamDto } from './dto/input/delete-invoice-payment-input-param.dto';
import { DeleteInvoicePaymentOutputDto } from './dto/output/delete-invoice-payment-output.dto';

@Injectable()
export class InvoicePaymentService {
  constructor(private prisma: PrismaService) {}

  private mapDecimalFields(item: any) {
    return {
      ...item,
      valuePayment: Number(item.valuePayment),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    };
  }

  async create(dto: CreateInvoicePaymentInputBodyDto): Promise<CreateInvoicePaymentOutputDto> {
    const data: any = { ...dto };
    if (dto.paymentAt) data.paymentAt = new Date(dto.paymentAt);
    const item = await this.prisma.invoicePayment.create({ data });
    return this.mapDecimalFields(item);
  }

  async findAll(query: FindAllInvoicePaymentInputQueryDto): Promise<FindAllInvoicePaymentOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [items, totalItems] = await Promise.all([
      this.prisma.invoicePayment.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.invoicePayment.count({ where }),
    ]);
    const data = items.map((item) => this.mapDecimalFields(item));
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneInvoicePaymentInputParamDto): Promise<FindOneInvoicePaymentOutputDto> {
    const item = await this.prisma.invoicePayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayment not found');
    return this.mapDecimalFields(item);
  }

  async update(param: UpdateInvoicePaymentInputParamDto, body: UpdateInvoicePaymentInputBodyDto): Promise<UpdateInvoicePaymentOutputDto> {
    const item = await this.prisma.invoicePayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayment not found');
    const data: any = { ...body };
    if (body.paymentAt) data.paymentAt = new Date(body.paymentAt);
    const updated = await this.prisma.invoicePayment.update({ where: { id: param.id }, data });
    return this.mapDecimalFields(updated);
  }

  async delete(param: DeleteInvoicePaymentInputParamDto): Promise<DeleteInvoicePaymentOutputDto> {
    const item = await this.prisma.invoicePayment.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayment not found');
    const deleted = await this.prisma.invoicePayment.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return this.mapDecimalFields(deleted);
  }
}
