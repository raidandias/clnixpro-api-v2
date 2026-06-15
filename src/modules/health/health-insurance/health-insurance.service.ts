import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateHealthInsuranceInputBodyDto } from './dto/input/create-health-insurance-input-body.dto';
import { CreateHealthInsuranceOutputDto } from './dto/output/create-health-insurance-output.dto';
import {
  UpdateHealthInsuranceInputBodyDto,
  UpdateHealthInsuranceInputParamDto,
} from './dto/input/update-health-insurance-input-param-hibrido.dto';
import { UpdateHealthInsuranceOutputDto } from './dto/output/update-health-insurance-output.dto';
import { FindAllHealthInsuranceOutputDto } from './dto/output/find-all-health-insurance-output.dto';
import { FindOneHealthInsuranceInputParamDto } from './dto/input/find-one-health-insurance-input-param.dto';
import { FindOneHealthInsuranceOutputDto } from './dto/output/find-one-health-insurance-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllHealthInsuranceInputQueryDto } from './dto/input/find-all-health-insurance-input-query.dto';

@Injectable()
export class HealthInsuranceService {
  constructor(private prisma: PrismaService) {}

  async create(
    createHealthInsuranceInputBodyDto: CreateHealthInsuranceInputBodyDto,
  ): Promise<CreateHealthInsuranceOutputDto> {
    const healthInsurance = await this.prisma.healthInsurance.create({
      data: {
        name: createHealthInsuranceInputBodyDto.name,
        flagCoperate: createHealthInsuranceInputBodyDto.flagCoperate,
        costPrice: createHealthInsuranceInputBodyDto.costPrice,
        dateOfBirthday: new Date(
          createHealthInsuranceInputBodyDto.dateOfBirthday,
        ),
        pathDocument: createHealthInsuranceInputBodyDto.pathDocument || null,
        pathLogo: createHealthInsuranceInputBodyDto.pathLogo || null,
        typeReturn: createHealthInsuranceInputBodyDto.typeReturn,
        accountId: createHealthInsuranceInputBodyDto.accountId,
      },
    });

    return { ...healthInsurance, costPrice: Number(healthInsurance.costPrice) };
  }

  async findAll(
    findAllHealthInsuranceInputQueryDto: FindAllHealthInsuranceInputQueryDto,
  ): Promise<FindAllHealthInsuranceOutputDto> {
    const { page, perPage, dateOfBirthday, flagCoperate, ...queryFilters } =
      findAllHealthInsuranceInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [healthInsurance, totalItems] = await Promise.all([
      this.prisma.healthInsurance.findMany({
        where: {
          ...queryFilters,
          dateOfBirthday: dateOfBirthday ? new Date(dateOfBirthday) : undefined,
          deletedAt: null,
          flagCoperate:
            flagCoperate !== undefined ? flagCoperate === 'true' : undefined,
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.healthInsurance.count({
        where: {
          ...queryFilters,
          dateOfBirthday: dateOfBirthday ? new Date(dateOfBirthday) : undefined,
          deletedAt: null,
          flagCoperate:
            flagCoperate !== undefined ? flagCoperate === 'true' : undefined,
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const mappedItemCatalogExams = healthInsurance.map((insurance) => ({
      id: insurance.id,
      accountId: insurance.accountId,
      name: insurance.name,
      flagCoperate: insurance.flagCoperate,
      costPrice: Number(insurance.costPrice),
      dateOfBirthday: insurance.dateOfBirthday,
      pathDocument: insurance.pathDocument,
      pathLogo: insurance.pathLogo,
      typeReturn: insurance.typeReturn,
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
      deletedAt: insurance.deletedAt,
    }));

    const response: FindAllHealthInsuranceOutputDto = {
      data: mappedItemCatalogExams,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneHealthInsuranceInputParamDto: FindOneHealthInsuranceInputParamDto,
  ): Promise<FindOneHealthInsuranceOutputDto> {
    const healthInsurance = await this.prisma.healthInsurance.findUnique({
      where: {
        id: findOneHealthInsuranceInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!healthInsurance) {
      throw new NotFoundException(`Health Insurance not found`);
    }

    return { ...healthInsurance, costPrice: Number(healthInsurance.costPrice) };
  }

  async update(
    updateHealthInsuranceInputParamDto: UpdateHealthInsuranceInputParamDto,
    updateHealthInsuranceInputBodyDto: UpdateHealthInsuranceInputBodyDto,
  ): Promise<UpdateHealthInsuranceOutputDto> {
    const healthInsurance = await this.prisma.healthInsurance.findUnique({
      where: { id: updateHealthInsuranceInputParamDto.id, deletedAt: null },
    });

    if (!healthInsurance) {
      throw new NotFoundException(`Health Insurance not found`);
    }

    const updatedHealthInsurance = await this.prisma.healthInsurance.update({
      where: { id: updateHealthInsuranceInputParamDto.id, deletedAt: null },
      data: {
        name: updateHealthInsuranceInputBodyDto.name || undefined,
        costPrice: !isNaN(updateHealthInsuranceInputBodyDto.costPrice)
          ? updateHealthInsuranceInputBodyDto.costPrice
          : undefined,
        dateOfBirthday: updateHealthInsuranceInputBodyDto.dateOfBirthday
          ? new Date(updateHealthInsuranceInputBodyDto.dateOfBirthday)
          : undefined,
        pathDocument:
          updateHealthInsuranceInputBodyDto.pathDocument || undefined,
        pathLogo: updateHealthInsuranceInputBodyDto.pathLogo || undefined,
        typeReturn: updateHealthInsuranceInputBodyDto.typeReturn || undefined,
        flagCoperate: updateHealthInsuranceInputBodyDto.flagCoperate || false,
        accountId: updateHealthInsuranceInputBodyDto.accountId || undefined,
      },
    });

    return {
      ...updatedHealthInsurance,
      costPrice: Number(updatedHealthInsurance.costPrice),
    };
  }
}
