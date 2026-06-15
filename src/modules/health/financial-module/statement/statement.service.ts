import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateStatementInputBodyDto } from './dto/input/create-statement-input-body.dto';
import { CreateStatementOutputDto } from './dto/output/create-statement-output.dto';
import { FindAllStatementInputQueryDto } from './dto/input/find-all-statement-input-query.dto';
import { FindAllStatementOutputDto } from './dto/output/find-all-statement-output.dto';
import { FindOneStatementInputParamDto } from './dto/input/find-one-statement-input-param.dto';
import { FindOneStatementOutputDto } from './dto/output/find-one-statement-output.dto';
import { UpdateStatementInputBodyDto, UpdateStatementInputParamDto } from './dto/input/update-statement-input-param-hibrido.dto';
import { UpdateStatementOutputDto } from './dto/output/update-statement-output.dto';
import { DeleteStatementInputParamDto } from './dto/input/delete-statement-input-param.dto';
import { DeleteStatementOutputDto } from './dto/output/delete-statement-output.dto';

@Injectable()
export class StatementService {
  constructor(private prisma: PrismaService) {}

  private mapDecimalFields(item: any) {
    return {
      ...item,
      amount: Number(item.amount),
    };
  }

  async create(dto: CreateStatementInputBodyDto): Promise<CreateStatementOutputDto> {
    const item = await this.prisma.statement.create({ data: dto as any });
    return this.mapDecimalFields(item);
  }

  async findAll(query: FindAllStatementInputQueryDto): Promise<FindAllStatementOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters };
    const [items, totalItems] = await Promise.all([
      this.prisma.statement.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.statement.count({ where }),
    ]);
    const data = items.map((item) => this.mapDecimalFields(item));
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneStatementInputParamDto): Promise<FindOneStatementOutputDto> {
    const item = await this.prisma.statement.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Statement not found');
    return this.mapDecimalFields(item);
  }

  async update(param: UpdateStatementInputParamDto, body: UpdateStatementInputBodyDto): Promise<UpdateStatementOutputDto> {
    const item = await this.prisma.statement.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Statement not found');
    const updated = await this.prisma.statement.update({ where: { id: param.id }, data: body });
    return this.mapDecimalFields(updated);
  }

  async delete(param: DeleteStatementInputParamDto): Promise<DeleteStatementOutputDto> {
    const item = await this.prisma.statement.findUnique({ where: { id: param.id } });
    if (!item) throw new NotFoundException('Statement not found');
    const deleted = await this.prisma.statement.delete({ where: { id: param.id } });
    return this.mapDecimalFields(deleted);
  }
}
