import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateBenefitInputBodyDto } from './dto/input/create-benefit-input-body.dto';
import { CreateBenefitOutputDto } from './dto/output/create-benefit-output.dto';
import { FindAllBenefitInputQueryDto } from './dto/input/find-all-benefit-input-query.dto';
import { FindAllBenefitOutputDto } from './dto/output/find-all-benefit-output.dto';
import { FindOneBenefitInputParamDto } from './dto/input/find-one-benefit-input-param.dto';
import { FindOneBenefitOutputDto } from './dto/output/find-one-benefit-output.dto';
import { UpdateBenefitInputParamDto, UpdateBenefitInputBodyDto } from './dto/input/update-benefit-input-param-hibrido.dto';
import { UpdateBenefitOutputDto } from './dto/output/update-benefit-output.dto';
import { DeleteBenefitInputParamDto } from './dto/input/delete-benefit-input-param.dto';
import { DeleteBenefitOutputDto } from './dto/output/delete-benefit-output.dto';

@Injectable()
export class BenefitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBenefitInputBodyDto): Promise<CreateBenefitOutputDto> {
    const benefit = await this.prisma.benefit.create({ data: dto as any });
    return { ...benefit, valuePrice: Number(benefit.valuePrice) };
  }

  async findAll(query: FindAllBenefitInputQueryDto): Promise<FindAllBenefitOutputDto> {
    const { page, perPage, name, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where: any = {
      ...filters,
      deletedAt: null,
    };
    if (name) {
      where.name = { contains: name };
    }
    const [data, totalItems] = await Promise.all([
      this.prisma.benefit.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.benefit.count({ where }),
    ]);
    return {
      data: data.map((item) => ({ ...item, valuePrice: Number(item.valuePrice) })),
      pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage),
    };
  }

  async findOne(param: FindOneBenefitInputParamDto): Promise<FindOneBenefitOutputDto> {
    const item = await this.prisma.benefit.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit not found');
    return { ...item, valuePrice: Number(item.valuePrice) };
  }

  async update(param: UpdateBenefitInputParamDto, body: UpdateBenefitInputBodyDto): Promise<UpdateBenefitOutputDto> {
    const item = await this.prisma.benefit.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit not found');
    const updated = await this.prisma.benefit.update({ where: { id: param.id }, data: body });
    return { ...updated, valuePrice: Number(updated.valuePrice) };
  }

  async delete(param: DeleteBenefitInputParamDto): Promise<DeleteBenefitOutputDto> {
    const item = await this.prisma.benefit.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit not found');
    const deleted = await this.prisma.benefit.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return { ...deleted, valuePrice: Number(deleted.valuePrice) };
  }
}
