import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';

import { CreateHealthMedicalCareFileInputBodyDto } from './dto/input/create-health-medical-care-file-input-body.dto';
import { CreateHealthMedicalCareFileOutputDto } from './dto/output/create-health-medical-care-file-output.dto';
import { FindAllHealthMedicalCareFileInputQueryDto } from './dto/input/find-all-health-medical-care-file-input-query.dto';
import { FindAllHealthMedicalCareFileOutputDto } from './dto/output/find-all-health-medical-care-file-output.dto';
import { FindOneHealthMedicalCareFileInputParamDto } from './dto/input/find-one-health-medical-care-file-input-param.dto';
import { FindOneHealthMedicalCareFileOutputDto } from './dto/output/find-one-health-medical-care-file-output.dto';
import {
  UpdateHealthMedicalCareFileInputBodyDto,
  UpdateHealthMedicalCareFileInputParamDto,
} from './dto/input/update-health-medical-care-file-input-param-hibrido.dto';
import { UpdateHealthMedicalCareFileOutputDto } from './dto/output/update-health-medical-care-file-output.dto';
import { DeleteHealthMedicalCareFileInputParamDto } from './dto/input/delete-health-medical-care-file-input-param.dto';
import { DeleteHealthMedicalCareFileOutputDto } from './dto/output/delete-health-medical-care-file-output.dto';

@Injectable()
export class HealthMedicalCareFileService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateHealthMedicalCareFileInputBodyDto,
  ): Promise<CreateHealthMedicalCareFileOutputDto> {
    return this.prisma.healthMedicalCareFile.create({
      data: {
        accountId: dto.accountId,
        healthMedicalCareId: dto.healthMedicalCareId,
        pathFile: dto.pathFile,
      },
    });
  }

  async findAll(
    query: FindAllHealthMedicalCareFileInputQueryDto,
  ): Promise<FindAllHealthMedicalCareFileOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };

    const [data, totalItems] = await Promise.all([
      this.prisma.healthMedicalCareFile.findMany({
        where,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.healthMedicalCareFile.count({ where }),
    ]);

    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(
    param: FindOneHealthMedicalCareFileInputParamDto,
  ): Promise<FindOneHealthMedicalCareFileOutputDto> {
    const item = await this.prisma.healthMedicalCareFile.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care File not found');
    return item;
  }

  async update(
    param: UpdateHealthMedicalCareFileInputParamDto,
    body: UpdateHealthMedicalCareFileInputBodyDto,
  ): Promise<UpdateHealthMedicalCareFileOutputDto> {
    const item = await this.prisma.healthMedicalCareFile.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care File not found');

    return this.prisma.healthMedicalCareFile.update({
      where: { id: param.id },
      data: {
        pathFile: body.pathFile || undefined,
      },
    });
  }

  async delete(
    param: DeleteHealthMedicalCareFileInputParamDto,
  ): Promise<DeleteHealthMedicalCareFileOutputDto> {
    const item = await this.prisma.healthMedicalCareFile.findUnique({
      where: { id: param.id, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Health Medical Care File not found');

    return this.prisma.healthMedicalCareFile.update({
      where: { id: param.id },
      data: { deletedAt: new Date() },
    });
  }
}
