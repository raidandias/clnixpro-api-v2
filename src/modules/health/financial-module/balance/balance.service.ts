import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateBalanceInputBodyDto } from './dto/input/create-balance-input-body.dto';
import { CreateBalanceOutputDto } from './dto/output/create-balance-output.dto';
import { FindAllBalanceInputQueryDto } from './dto/input/find-all-balance-input-query.dto';
import { FindAllBalanceOutputDto } from './dto/output/find-all-balance-output.dto';
import { FindOneBalanceInputParamDto } from './dto/input/find-one-balance-input-param.dto';
import { FindOneBalanceOutputDto } from './dto/output/find-one-balance-output.dto';
import { UpdateBalanceInputBodyDto, UpdateBalanceInputParamDto } from './dto/input/update-balance-input-param-hibrido.dto';
import { UpdateBalanceOutputDto } from './dto/output/update-balance-output.dto';
import { DeleteBalanceInputParamDto } from './dto/input/delete-balance-input-param.dto';
import { DeleteBalanceOutputDto } from './dto/output/delete-balance-output.dto';

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) {}

  private mapDecimalFields(item: any) {
    return {
      ...item,
      totalReceivable: Number(item.totalReceivable),
      totalPayable: Number(item.totalPayable),
      currentBalance: Number(item.currentBalance),
    };
  }

  async create(dto: CreateBalanceInputBodyDto): Promise<CreateBalanceOutputDto> {
    const item = await this.prisma.balance.create({ data: dto as any });
    return this.mapDecimalFields(item);
  }

  async findAll(query: FindAllBalanceInputQueryDto): Promise<FindAllBalanceOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters };
    const [items, totalItems] = await Promise.all([
      this.prisma.balance.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.balance.count({ where }),
    ]);
    const data = items.map((item) => this.mapDecimalFields(item));
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneBalanceInputParamDto): Promise<FindOneBalanceOutputDto> {
    const item = await this.prisma.balance.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Balance not found');
    return this.mapDecimalFields(item);
  }

  async update(param: UpdateBalanceInputParamDto, body: UpdateBalanceInputBodyDto): Promise<UpdateBalanceOutputDto> {
    const item = await this.prisma.balance.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Balance not found');
    const updated = await this.prisma.balance.update({ where: { id: param.id }, data: body });
    return this.mapDecimalFields(updated);
  }

  async delete(param: DeleteBalanceInputParamDto): Promise<DeleteBalanceOutputDto> {
    const item = await this.prisma.balance.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Balance not found');
    const deleted = await this.prisma.balance.delete({ where: { id: param.id } });
    return this.mapDecimalFields(deleted);
  }
}
