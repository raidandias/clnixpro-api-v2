import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateBenefitItemInputBodyDto } from './dto/input/create-benefit-item-input-body.dto';
import { CreateBenefitItemOutputDto } from './dto/output/create-benefit-item-output.dto';
import { FindAllBenefitItemInputQueryDto } from './dto/input/find-all-benefit-item-input-query.dto';
import { FindAllBenefitItemOutputDto } from './dto/output/find-all-benefit-item-output.dto';
import { FindOneBenefitItemInputParamDto } from './dto/input/find-one-benefit-item-input-param.dto';
import { FindOneBenefitItemOutputDto } from './dto/output/find-one-benefit-item-output.dto';
import { UpdateBenefitItemInputParamDto, UpdateBenefitItemInputBodyDto } from './dto/input/update-benefit-item-input-param-hibrido.dto';
import { UpdateBenefitItemOutputDto } from './dto/output/update-benefit-item-output.dto';
import { DeleteBenefitItemInputParamDto } from './dto/input/delete-benefit-item-input-param.dto';
import { DeleteBenefitItemOutputDto } from './dto/output/delete-benefit-item-output.dto';

@Injectable()
export class BenefitItemService {
  constructor(private prisma: PrismaService) {}

  private mapItem(item: any): FindOneBenefitItemOutputDto {
    return {
      ...item,
      valuePrice: Number(item.valuePrice),
      discount: Number(item.discount),
    };
  }

  async create(dto: CreateBenefitItemInputBodyDto): Promise<CreateBenefitItemOutputDto> {
    const item = await this.prisma.benefitItem.create({ data: dto as any });
    return this.mapItem(item);
  }

  async findAll(query: FindAllBenefitItemInputQueryDto): Promise<FindAllBenefitItemOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.benefitItem.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.benefitItem.count({ where }),
    ]);
    return {
      data: data.map((item) => this.mapItem(item)),
      pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage),
    };
  }

  async findOne(param: FindOneBenefitItemInputParamDto): Promise<FindOneBenefitItemOutputDto> {
    const item = await this.prisma.benefitItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Item not found');
    return this.mapItem(item);
  }

  async update(param: UpdateBenefitItemInputParamDto, body: UpdateBenefitItemInputBodyDto): Promise<UpdateBenefitItemOutputDto> {
    const item = await this.prisma.benefitItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Item not found');
    const updated = await this.prisma.benefitItem.update({ where: { id: param.id }, data: body });
    return this.mapItem(updated);
  }

  async delete(param: DeleteBenefitItemInputParamDto): Promise<DeleteBenefitItemOutputDto> {
    const item = await this.prisma.benefitItem.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Item not found');
    const deleted = await this.prisma.benefitItem.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
    return this.mapItem(deleted);
  }
}
