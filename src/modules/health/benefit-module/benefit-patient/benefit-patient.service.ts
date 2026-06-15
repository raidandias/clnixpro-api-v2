import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateBenefitPatientInputBodyDto } from './dto/input/create-benefit-patient-input-body.dto';
import { CreateBenefitPatientOutputDto } from './dto/output/create-benefit-patient-output.dto';
import { FindAllBenefitPatientInputQueryDto } from './dto/input/find-all-benefit-patient-input-query.dto';
import { FindAllBenefitPatientOutputDto } from './dto/output/find-all-benefit-patient-output.dto';
import { FindOneBenefitPatientInputParamDto } from './dto/input/find-one-benefit-patient-input-param.dto';
import { FindOneBenefitPatientOutputDto } from './dto/output/find-one-benefit-patient-output.dto';
import { UpdateBenefitPatientInputParamDto, UpdateBenefitPatientInputBodyDto } from './dto/input/update-benefit-patient-input-param-hibrido.dto';
import { UpdateBenefitPatientOutputDto } from './dto/output/update-benefit-patient-output.dto';
import { DeleteBenefitPatientInputParamDto } from './dto/input/delete-benefit-patient-input-param.dto';
import { DeleteBenefitPatientOutputDto } from './dto/output/delete-benefit-patient-output.dto';

@Injectable()
export class BenefitPatientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBenefitPatientInputBodyDto): Promise<CreateBenefitPatientOutputDto> {
    return this.prisma.benefitPacient.create({ data: dto as any });
  }

  async findAll(query: FindAllBenefitPatientInputQueryDto): Promise<FindAllBenefitPatientOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.benefitPacient.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.benefitPacient.count({ where }),
    ]);
    return {
      data,
      pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage),
    };
  }

  async findOne(param: FindOneBenefitPatientInputParamDto): Promise<FindOneBenefitPatientOutputDto> {
    const item = await this.prisma.benefitPacient.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Patient not found');
    return item;
  }

  async update(param: UpdateBenefitPatientInputParamDto, body: UpdateBenefitPatientInputBodyDto): Promise<UpdateBenefitPatientOutputDto> {
    const item = await this.prisma.benefitPacient.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Patient not found');
    return this.prisma.benefitPacient.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteBenefitPatientInputParamDto): Promise<DeleteBenefitPatientOutputDto> {
    const item = await this.prisma.benefitPacient.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Benefit Patient not found');
    return this.prisma.benefitPacient.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
