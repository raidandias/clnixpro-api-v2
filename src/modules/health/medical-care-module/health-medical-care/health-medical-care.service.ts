import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';

import { CreateHealthMedicalCareInputBodyDto } from './dto/input/create-health-medical-care-input-body.dto';
import { CreateHealthMedicalCareOutputDto } from './dto/output/create-health-medical-care-output.dto';
import { FindAllHealthMedicalCareInputQueryDto } from './dto/input/find-all-health-medical-care-input-query.dto';
import { FindAllHealthMedicalCareOutputDto } from './dto/output/find-all-health-medical-care-output.dto';
import { FindOneHealthMedicalCareInputParamDto } from './dto/input/find-one-health-medical-care-input-param.dto';
import { FindOneHealthMedicalCareOutputDto } from './dto/output/find-one-health-medical-care-output.dto';
import {
  UpdateHealthMedicalCareInputBodyDto,
  UpdateHealthMedicalCareInputParamDto,
} from './dto/input/update-health-medical-care-input-param-hibrido.dto';
import { UpdateHealthMedicalCareOutputDto } from './dto/output/update-health-medical-care-output.dto';
import { DeleteHealthMedicalCareInputParamDto } from './dto/input/delete-health-medical-care-input-param.dto';
import { DeleteHealthMedicalCareOutputDto } from './dto/output/delete-health-medical-care-output.dto';

@Injectable()
export class HealthMedicalCareService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateHealthMedicalCareInputBodyDto,
  ): Promise<CreateHealthMedicalCareOutputDto> {
    return this.prisma.healthMedicalCare.create({
      data: {
        accountId: dto.accountId,
        professionalId: dto.professionalId,
        patientId: dto.patientId,
        scheduleId: dto.scheduleId,
        description: dto.description,
        observation: dto.observation || null,
        prescription: dto.prescription || null,
        status: dto.status,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
      },
    });
  }

  async findAll(
    query: FindAllHealthMedicalCareInputQueryDto,
  ): Promise<FindAllHealthMedicalCareOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };

    const [data, totalItems] = await Promise.all([
      this.prisma.healthMedicalCare.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.healthMedicalCare.count({ where }),
    ]);

    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(
    param: FindOneHealthMedicalCareInputParamDto,
  ): Promise<FindOneHealthMedicalCareOutputDto> {
    const item = await this.prisma.healthMedicalCare.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care not found');
    return item;
  }

  async update(
    param: UpdateHealthMedicalCareInputParamDto,
    body: UpdateHealthMedicalCareInputBodyDto,
  ): Promise<UpdateHealthMedicalCareOutputDto> {
    const item = await this.prisma.healthMedicalCare.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care not found');

    return this.prisma.healthMedicalCare.update({
      where: { id: param.id },
      data: {
        description: body.description || undefined,
        observation: body.observation !== undefined ? body.observation : undefined,
        prescription: body.prescription !== undefined ? body.prescription : undefined,
        status: body.status || undefined,
        startAt: body.startAt ? new Date(body.startAt) : undefined,
        endAt: body.endAt ? new Date(body.endAt) : undefined,
      },
    });
  }

  async delete(
    param: DeleteHealthMedicalCareInputParamDto,
  ): Promise<DeleteHealthMedicalCareOutputDto> {
    const item = await this.prisma.healthMedicalCare.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care not found');

    return this.prisma.healthMedicalCare.update({
      where: { id: param.id },
      data: { deletedAt: new Date() },
    });
  }
}
