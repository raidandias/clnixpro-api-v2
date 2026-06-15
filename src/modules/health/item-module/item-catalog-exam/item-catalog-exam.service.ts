import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemCatalogExamInputBodyDto } from './dto/input/create-item-catalog-exam-input-body.dto';
import { CreateItemCatalogExamOutputDto } from './dto/output/create-item-catalog-exam-output.dto';
import {
  UpdateItemCatalogExamInputBodyDto,
  UpdateItemCatalogExamInputParamDto,
} from './dto/input/update-item-catalog-exam-input-param-hibrido.dto';
import { UpdateItemCatalogExamOutputDto } from './dto/output/update-item-catalog-exam-output.dto';
import { FindAllItemCatalogExamOutputDto } from './dto/output/find-all-item-catalog-exam-output.dto';
import { FindOneItemCatalogExamInputParamDto } from './dto/input/find-one-item-catalog-exam-input-param.dto';
import { FindOneItemCatalogExamOutputDto } from './dto/output/find-one-item-catalog-exam-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemCatalogExamInputQueryDto } from './dto/input/find-all-item-catalog-exam-input-query.dto';
import { ItemService } from '../item/item.service';
import { ItemCategory } from '@prisma/client';
import { FindOneItemHealthInsuranceOutputDto } from '../item-health-insurance/dto/output/find-one-item-health-insurance-output.dto';

@Injectable()
export class ItemCatalogExamService {
  constructor(
    private prisma: PrismaService,
    private itemService: ItemService,
  ) {}

  async create(
    createItemCatalogExamInputBodyDto: CreateItemCatalogExamInputBodyDto,
  ): Promise<CreateItemCatalogExamOutputDto> {
    const { itemId, accountId, ...exam } = createItemCatalogExamInputBodyDto;

    const item = await this.itemService.findOne({ id: itemId });
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    if (item.category !== ItemCategory.EXAM) {
      throw new NotFoundException(`Item is not a Exam`);
    }

    const itemCatalogExam = await this.prisma.itemCatalog.create({
      data: {
        accountId: accountId,
        itemId: itemId,
        name: exam.name,
        title: exam.title,
        description: exam.description,
        price: Number(exam.price),
        costPrice: Number(exam.costPrice),
        flagBenefit: exam.flagBenefit,
        duration: exam.duration,
        bodyMembers: exam.bodyMembers,
        typeExam: exam.typeExam,
        protocol: exam.protocol,
        indications: exam.indications,
        observationForPatient: exam.observationForPatient,
        observationForProfessional: exam.observationForProfessional,
      },
      include: { item: true },
    });

    return {
      id: itemCatalogExam.id,
      itemId: itemCatalogExam.itemId,
      accountId: itemCatalogExam.accountId,
      name: itemCatalogExam.name,
      title: itemCatalogExam.title,
      description: itemCatalogExam.description,
      price: Number(itemCatalogExam.price),
      costPrice: Number(itemCatalogExam.costPrice),
      flagBenefit: itemCatalogExam.flagBenefit,
      duration: itemCatalogExam.duration,
      bodyMembers: itemCatalogExam.bodyMembers,
      typeExam: itemCatalogExam.typeExam,
      protocol: itemCatalogExam.protocol,
      indications: itemCatalogExam.indications,
      observationForPatient: itemCatalogExam.observationForPatient,
      observationForProfessional: itemCatalogExam.observationForProfessional,
      createdAt: itemCatalogExam.createdAt,
      updatedAt: itemCatalogExam.updatedAt,
      deletedAt: itemCatalogExam.deletedAt,
      item: itemCatalogExam.item,
    };
  }

  async findAll(
    findAllItemCatalogExamInputQueryDto: FindAllItemCatalogExamInputQueryDto,
  ): Promise<FindAllItemCatalogExamOutputDto> {
    const { page, perPage, flagBenefit, duration, ...queryFilters } =
      findAllItemCatalogExamInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemCatalogExam, totalItems] = await Promise.all([
      this.prisma.itemCatalog.findMany({
        where: {
          ...queryFilters,
          deletedAt: null,
          item: { category: ItemCategory.EXAM, deletedAt: null },
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: { item: true },
      }),
      this.prisma.itemCatalog.count({
        where: {
          ...queryFilters,
          deletedAt: null,
          item: { category: ItemCategory.EXAM, deletedAt: null },
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const mappedItemCatalogExams = itemCatalogExam.map((itemCatalogExam) => ({
      id: itemCatalogExam.id,
      itemId: itemCatalogExam.itemId,
      accountId: itemCatalogExam.accountId,
      name: itemCatalogExam.name,
      title: itemCatalogExam.title,
      description: itemCatalogExam.description,
      price: Number(itemCatalogExam.price),
      costPrice: Number(itemCatalogExam.costPrice),
      flagBenefit: itemCatalogExam.flagBenefit,
      duration: itemCatalogExam.duration,
      bodyMembers: itemCatalogExam.bodyMembers,
      typeExam: itemCatalogExam.typeExam,
      protocol: itemCatalogExam.protocol,
      indications: itemCatalogExam.indications,
      observationForPatient: itemCatalogExam.observationForPatient,
      observationForProfessional: itemCatalogExam.observationForProfessional,
      createdAt: itemCatalogExam.createdAt,
      updatedAt: itemCatalogExam.updatedAt,
      deletedAt: itemCatalogExam.deletedAt,
      item: itemCatalogExam.item,
    }));

    const response: FindAllItemCatalogExamOutputDto = {
      data: mappedItemCatalogExams,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemCatalogExamInputParamDto: FindOneItemCatalogExamInputParamDto,
  ): Promise<FindOneItemCatalogExamOutputDto> {
    const itemCatalogExam = await this.prisma.itemCatalog.findUnique({
      where: {
        id: findOneItemCatalogExamInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.EXAM, deletedAt: null },
      },
      include: {
        item: true,
        itemHealthInsurances: {
          where: { deletedAt: null },
          include: {
            item: true,
            healthInsurance: true,
          },
        },
      },
    });

    if (!itemCatalogExam) {
      throw new NotFoundException(`Item Exam not found`);
    }

    const insurances: FindOneItemHealthInsuranceOutputDto[] =
      itemCatalogExam.itemHealthInsurances.map((insurance) => ({
        ...insurance,
        paymentValue: Number(insurance.paymentValue),
        item: insurance.item,
        healthInsurance: {
          ...insurance.healthInsurance,
          costPrice: Number(insurance.healthInsurance.costPrice),
        },
      }));

    return {
      id: itemCatalogExam.id,
      itemId: itemCatalogExam.itemId,
      accountId: itemCatalogExam.accountId,
      name: itemCatalogExam.name,
      title: itemCatalogExam.title,
      description: itemCatalogExam.description,
      price: Number(itemCatalogExam.price),
      costPrice: Number(itemCatalogExam.costPrice),
      flagBenefit: itemCatalogExam.flagBenefit,
      duration: itemCatalogExam.duration,
      bodyMembers: itemCatalogExam.bodyMembers,
      typeExam: itemCatalogExam.typeExam,
      protocol: itemCatalogExam.protocol,
      indications: itemCatalogExam.indications,
      observationForPatient: itemCatalogExam.observationForPatient,
      observationForProfessional: itemCatalogExam.observationForProfessional,
      createdAt: itemCatalogExam.createdAt,
      updatedAt: itemCatalogExam.updatedAt,
      deletedAt: itemCatalogExam.deletedAt,
      item: itemCatalogExam.item,
      itemHealthInsurances: insurances,
    };
  }

  async update(
    updateItemCatalogExamInputParamDto: UpdateItemCatalogExamInputParamDto,
    updateItemCatalogExamInputBodyDto: UpdateItemCatalogExamInputBodyDto,
  ): Promise<UpdateItemCatalogExamOutputDto> {
    const itemCatalogExam = await this.prisma.itemCatalog.findUnique({
      where: { id: updateItemCatalogExamInputParamDto.id, deletedAt: null },
    });

    if (!itemCatalogExam) {
      throw new NotFoundException(`Item Exam not found`);
    }

    const updatedItemCatalogExam = await this.prisma.itemCatalog.update({
      where: { id: updateItemCatalogExamInputParamDto.id, deletedAt: null },
      data: {
        name: updateItemCatalogExamInputBodyDto.name || undefined,
        accountId: updateItemCatalogExamInputBodyDto.accountId || undefined,
        title: updateItemCatalogExamInputBodyDto.title || undefined,
        description: updateItemCatalogExamInputBodyDto.description || undefined,
        price: updateItemCatalogExamInputBodyDto.price || undefined,
        costPrice: updateItemCatalogExamInputBodyDto.costPrice || undefined,
        flagBenefit: updateItemCatalogExamInputBodyDto.flagBenefit || undefined,
        duration: updateItemCatalogExamInputBodyDto.duration || undefined,
        bodyMembers: updateItemCatalogExamInputBodyDto.bodyMembers || undefined,
        typeExam: updateItemCatalogExamInputBodyDto.typeExam || undefined,
        protocol: updateItemCatalogExamInputBodyDto.protocol || undefined,
        indications: updateItemCatalogExamInputBodyDto.indications || undefined,
        observationForPatient:
          updateItemCatalogExamInputBodyDto.observationForPatient || undefined,
        observationForProfessional:
          updateItemCatalogExamInputBodyDto.observationForProfessional ||
          undefined,
      },
      include: { item: true },
    });

    return {
      id: updatedItemCatalogExam.id,
      accountId: updatedItemCatalogExam.accountId,
      itemId: updatedItemCatalogExam.itemId,
      name: updatedItemCatalogExam.name,
      title: updatedItemCatalogExam.title,
      description: updatedItemCatalogExam.description,
      price: Number(updatedItemCatalogExam.price),
      costPrice: Number(updatedItemCatalogExam.costPrice),
      flagBenefit: updatedItemCatalogExam.flagBenefit,
      duration: updatedItemCatalogExam.duration,
      bodyMembers: updatedItemCatalogExam.bodyMembers,
      typeExam: updatedItemCatalogExam.typeExam,
      protocol: updatedItemCatalogExam.protocol,
      indications: updatedItemCatalogExam.indications,
      observationForPatient: updatedItemCatalogExam.observationForPatient,
      observationForProfessional:
        updatedItemCatalogExam.observationForProfessional,
      createdAt: updatedItemCatalogExam.createdAt,
      updatedAt: updatedItemCatalogExam.updatedAt,
      deletedAt: updatedItemCatalogExam.deletedAt,
      item: updatedItemCatalogExam.item,
    };
  }
}
