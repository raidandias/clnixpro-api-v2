import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateInvoiceReceivableInputBodyDto } from './dto/input/create-invoice-receivable-input-body.dto';
import { CreateInvoiceReceivableOutputDto } from './dto/output/create-invoice-receivable-output.dto';
import { FindAllInvoiceReceivableInputQueryDto } from './dto/input/find-all-invoice-receivable-input-query.dto';
import { FindAllInvoiceReceivableOutputDto } from './dto/output/find-all-invoice-receivable-output.dto';
import { FindOneInvoiceReceivableInputParamDto } from './dto/input/find-one-invoice-receivable-input-param.dto';
import { FindOneInvoiceReceivableOutputDto } from './dto/output/find-one-invoice-receivable-output.dto';
import { UpdateInvoiceReceivableInputBodyDto, UpdateInvoiceReceivableInputParamDto } from './dto/input/update-invoice-receivable-input-param-hibrido.dto';
import { UpdateInvoiceReceivableOutputDto } from './dto/output/update-invoice-receivable-output.dto';
import { DeleteInvoiceReceivableInputParamDto } from './dto/input/delete-invoice-receivable-input-param.dto';
import { DeleteInvoiceReceivableOutputDto } from './dto/output/delete-invoice-receivable-output.dto';

@Injectable()
export class InvoiceReceivableService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInvoiceReceivableInputBodyDto): Promise<CreateInvoiceReceivableOutputDto> {
    const data: any = { ...dto };
    if (dto.dueAt) data.dueAt = new Date(dto.dueAt);
    if (dto.paymentAt) data.paymentAt = new Date(dto.paymentAt);
    const item = await this.prisma.invoiceReceivable.create({ data });
    return {
      ...item,
      valueTotal: Number(item.valueTotal),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    };
  }

  async findAll(query: FindAllInvoiceReceivableInputQueryDto): Promise<FindAllInvoiceReceivableOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [items, totalItems] = await Promise.all([
      this.prisma.invoiceReceivable.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.invoiceReceivable.count({ where }),
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

  async findOne(param: FindOneInvoiceReceivableInputParamDto): Promise<FindOneInvoiceReceivableOutputDto> {
    const item = await this.prisma.invoiceReceivable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoiceReceivable not found');
    return {
      ...item,
      valueTotal: Number(item.valueTotal),
      valueDiscount: Number(item.valueDiscount),
      valueFeesFixed: Number(item.valueFeesFixed),
      valueFeesPercent: Number(item.valueFeesPercent),
    };
  }

  async update(param: UpdateInvoiceReceivableInputParamDto, body: UpdateInvoiceReceivableInputBodyDto): Promise<UpdateInvoiceReceivableOutputDto> {
    const item = await this.prisma.invoiceReceivable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoiceReceivable not found');
    const data: any = { ...body };
    if (body.dueAt) data.dueAt = new Date(body.dueAt);
    if (body.paymentAt) data.paymentAt = new Date(body.paymentAt);
    const updated = await this.prisma.invoiceReceivable.update({ where: { id: param.id }, data });
    return {
      ...updated,
      valueTotal: Number(updated.valueTotal),
      valueDiscount: Number(updated.valueDiscount),
      valueFeesFixed: Number(updated.valueFeesFixed),
      valueFeesPercent: Number(updated.valueFeesPercent),
    };
  }

  async delete(param: DeleteInvoiceReceivableInputParamDto): Promise<DeleteInvoiceReceivableOutputDto> {
    const item = await this.prisma.invoiceReceivable.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('InvoiceReceivable not found');
    const deleted = await this.prisma.invoiceReceivable.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return {
      ...deleted,
      valueTotal: Number(deleted.valueTotal),
      valueDiscount: Number(deleted.valueDiscount),
      valueFeesFixed: Number(deleted.valueFeesFixed),
      valueFeesPercent: Number(deleted.valueFeesPercent),
    };
  }
}
