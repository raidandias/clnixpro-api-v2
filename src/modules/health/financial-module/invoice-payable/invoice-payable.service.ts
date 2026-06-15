import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateInvoicePayableInputBodyDto } from './dto/input/create-invoice-payable-input-body.dto';
import { CreateInvoicePayableOutputDto } from './dto/output/create-invoice-payable-output.dto';
import { FindAllInvoicePayableInputQueryDto } from './dto/input/find-all-invoice-payable-input-query.dto';
import { FindAllInvoicePayableOutputDto } from './dto/output/find-all-invoice-payable-output.dto';
import { FindOneInvoicePayableInputParamDto } from './dto/input/find-one-invoice-payable-input-param.dto';
import { FindOneInvoicePayableOutputDto } from './dto/output/find-one-invoice-payable-output.dto';
import { UpdateInvoicePayableInputBodyDto, UpdateInvoicePayableInputParamDto } from './dto/input/update-invoice-payable-input-param-hibrido.dto';
import { UpdateInvoicePayableOutputDto } from './dto/output/update-invoice-payable-output.dto';
import { DeleteInvoicePayableInputParamDto } from './dto/input/delete-invoice-payable-input-param.dto';
import { DeleteInvoicePayableOutputDto } from './dto/output/delete-invoice-payable-output.dto';

@Injectable()
export class InvoicePayableService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInvoicePayableInputBodyDto): Promise<CreateInvoicePayableOutputDto> {
    const data: any = { ...dto };
    if (dto.dueAt) data.dueAt = new Date(dto.dueAt);
    if (dto.paymentAt) data.paymentAt = new Date(dto.paymentAt);
    const item = await this.prisma.invoicePayable.create({ data });
    return {
      ...item,
      valueTotal: Number(item.valueTotal),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    };
  }

  async findAll(query: FindAllInvoicePayableInputQueryDto): Promise<FindAllInvoicePayableOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [items, totalItems] = await Promise.all([
      this.prisma.invoicePayable.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.invoicePayable.count({ where }),
    ]);
    const data = items.map((item) => ({
      ...item,
      valueTotal: Number(item.valueTotal),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    }));
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneInvoicePayableInputParamDto): Promise<FindOneInvoicePayableOutputDto> {
    const item = await this.prisma.invoicePayable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayable not found');
    return {
      ...item,
      valueTotal: Number(item.valueTotal),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    };
  }

  async update(param: UpdateInvoicePayableInputParamDto, body: UpdateInvoicePayableInputBodyDto): Promise<UpdateInvoicePayableOutputDto> {
    const item = await this.prisma.invoicePayable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayable not found');
    const data: any = { ...body };
    if (body.dueAt) data.dueAt = new Date(body.dueAt);
    if (body.paymentAt) data.paymentAt = new Date(body.paymentAt);
    const updated = await this.prisma.invoicePayable.update({ where: { id: param.id }, data });
    return {
      ...updated,
      valueTotal: Number(updated.valueTotal),
      valueDiscount: Number(updated.valueDiscount),
      valueFeesFixed: Number(updated.valueFeesFixed),
      valueFeesPercent: Number(updated.valueFeesPercent),
    };
  }

  async delete(param: DeleteInvoicePayableInputParamDto): Promise<DeleteInvoicePayableOutputDto> {
    const item = await this.prisma.invoicePayable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoicePayable not found');
    const deleted = await this.prisma.invoicePayable.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return {
      ...deleted,
      valueTotal: Number(deleted.valueTotal),
      valueDiscount: Number(deleted.valueDiscount),
      valueFeesFixed: Number(deleted.valueFeesFixed),
      valueFeesPercent: Number(deleted.valueFeesPercent),
    };
  }
}
