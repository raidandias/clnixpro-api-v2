import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemExamInputBodyArrayDto } from './dto/input/create-item-exam-input-body.dto';
import { CreateItemExamOutputDto } from './dto/output/create-item-exam-output.dto';
import {
  UpdateItemExamInputBodyDto,
  UpdateItemExamInputParamDto,
} from './dto/input/update-item-exam-input-param-hibrido.dto';
import { UpdateItemExamOutputDto } from './dto/output/update-item-exam-output.dto';
import { FindAllItemExamOutputDto } from './dto/output/find-all-item-exam-output.dto';
import { FindOneItemExamInputParamDto } from './dto/input/find-one-item-exam-input-param.dto';
import { FindOneItemExamOutputDto } from './dto/output/find-one-item-exam-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemExamInputQueryDto } from './dto/input/find-all-item-exam-input-query.dto';
import { ItemCategory } from '@prisma/client';
import { ItemCatalogExamService } from '../item-catalog-exam/item-catalog-exam.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';

@Injectable()
export class ItemExamService {
  constructor(
    private prisma: PrismaService,
    private itemCatalogExamService: ItemCatalogExamService,
    private itemCatalogServiceService: ItemCatalogServiceService,
  ) {}

  async create(
    createItemExamInputBodyDto: CreateItemExamInputBodyArrayDto,
  ): Promise<CreateItemExamOutputDto[]> {
    const itemExams = await Promise.all(
      createItemExamInputBodyDto.data.map(async (itemExam) => {
        const itemCatalogExam = await this.itemCatalogExamService.findOne({
          id: itemExam.itemCatalogExamId,
        });

        if (!itemCatalogExam) {
          throw new NotFoundException(`Item Exam not found`);
        }

        const itemCatalogService = await this.itemCatalogServiceService.findOne(
          {
            id: itemExam.itemCatalogServiceId,
          },
        );

        if (!itemCatalogService) {
          throw new NotFoundException(`Item Service not found`);
        }

        const itemExamExists = await this.prisma.itemExam.findFirst({
          where: {
            accountId: itemExam.accountId,
            itemId: itemExam.itemId,
            itemCatalogExamId: itemExam.itemCatalogExamId,
            itemCatalogServiceId: itemExam.itemCatalogServiceId,
            deletedAt: null,
          },
        });

        if (itemExamExists) {
          throw new NotFoundException(`Item Exam already exists`);
        }

        const itemExamCreate = await this.prisma.itemExam.create({
          data: {
            accountId: itemExam.accountId,
            itemCatalogExamId: itemExam.itemCatalogExamId,
            itemCatalogServiceId: itemExam.itemCatalogServiceId,
            itemId: itemExam.itemId,
          },
          include: {
            itemCatalogExam: {
              select: {
                id: true,
                itemId: true,
                accountId: true,
                name: true,
                title: true,
                description: true,
                price: true,
                costPrice: true,
                flagBenefit: true,
                duration: true,
                bodyMembers: true,
                typeExam: true,
                protocol: true,
                indications: true,
                observationForProfessional: true,
                observationForPatient: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                item: {
                  select: {
                    id: true,
                    accountId: true,
                    supplierId: true,
                    name: true,
                    description: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                  },
                },
              },
            },
          },
        });

        return itemExamCreate;
      }),
    );

    const mapperItemExam: FindOneItemExamOutputDto[] = itemExams.map(
      (exam) => ({
        id: exam.id,
        accountId: exam.accountId,
        itemId: exam.itemId,
        itemCatalogExamId: exam.itemCatalogExamId,
        itemCatalogServiceId: exam.itemCatalogServiceId,
        createdAt: exam.createdAt,
        updatedAt: exam.updatedAt,
        deletedAt: exam.deletedAt,
        itemCatalogExam: {
          ...exam.itemCatalogExam,
          price: Number(exam.itemCatalogExam.price),
          costPrice: Number(exam.itemCatalogExam.costPrice),
        },
      }),
    );

    return mapperItemExam;
  }

  async findAll(
    findAllItemExamInputQueryDto: FindAllItemExamInputQueryDto,
  ): Promise<FindAllItemExamOutputDto> {
    const { page, perPage, ...queryFilters } = findAllItemExamInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemExam, totalItems] = await Promise.all([
      this.prisma.itemExam.findMany({
        where: {
          itemId: queryFilters.itemId,
          accountId: queryFilters.accountId,
          itemCatalogExamId: queryFilters.itemCatalogExamId,
          itemCatalogServiceId: queryFilters.itemCatalogServiceId,
          createdAt: queryFilters.createdAt,
          updatedAt: queryFilters.updatedAt,
          deletedAt: null,
          item: { category: ItemCategory.PRODUCT, deletedAt: null },
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          itemCatalogExam: {
            select: {
              id: true,
              itemId: true,
              accountId: true,
              name: true,
              title: true,
              description: true,
              price: true,
              costPrice: true,
              flagBenefit: true,
              duration: true,
              bodyMembers: true,
              typeExam: true,
              protocol: true,
              indications: true,
              observationForProfessional: true,
              observationForPatient: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              item: {
                select: {
                  id: true,
                  accountId: true,
                  supplierId: true,
                  name: true,
                  description: true,
                  category: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.itemExam.count({
        where: {
          accountId: queryFilters.accountId,
          itemId: queryFilters.itemId,
          itemCatalogExamId: queryFilters.itemCatalogExamId,
          itemCatalogServiceId: queryFilters.itemCatalogServiceId,
          deletedAt: null,
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const mapperItemExam: FindOneItemExamOutputDto[] = itemExam.map((exam) => ({
      id: exam.id,
      accountId: exam.accountId,
      itemId: exam.itemId,
      itemCatalogExamId: exam.itemCatalogExamId,
      itemCatalogServiceId: exam.itemCatalogServiceId,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
      deletedAt: exam.deletedAt,
      itemCatalogExam: {
        ...exam.itemCatalogExam,
        price: Number(exam.itemCatalogExam.price),
        costPrice: Number(exam.itemCatalogExam.costPrice),
      },
    }));

    const response: FindAllItemExamOutputDto = {
      data: mapperItemExam,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemExamInputParamDto: FindOneItemExamInputParamDto,
  ): Promise<FindOneItemExamOutputDto> {
    const itemExam = await this.prisma.itemExam.findUnique({
      where: {
        id: findOneItemExamInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
      },
      include: {
        itemCatalogExam: {
          select: {
            id: true,
            itemId: true,
            accountId: true,
            name: true,
            title: true,
            description: true,
            price: true,
            costPrice: true,
            flagBenefit: true,
            duration: true,
            bodyMembers: true,
            typeExam: true,
            protocol: true,
            indications: true,
            observationForProfessional: true,
            observationForPatient: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            item: {
              select: {
                id: true,
                accountId: true,
                supplierId: true,
                name: true,
                description: true,
                category: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
      },
    });

    if (!itemExam) {
      throw new NotFoundException(`Item Exam not found`);
    }

    return {
      id: itemExam.id,
      accountId: itemExam.accountId,
      itemId: itemExam.itemId,
      itemCatalogExamId: itemExam.itemCatalogExamId,
      itemCatalogServiceId: itemExam.itemCatalogServiceId,
      createdAt: itemExam.createdAt,
      updatedAt: itemExam.updatedAt,
      deletedAt: itemExam.deletedAt,
      itemCatalogExam: {
        ...itemExam.itemCatalogExam,
        price: Number(itemExam.itemCatalogExam.price),
        costPrice: Number(itemExam.itemCatalogExam.costPrice),
      },
    };
  }

  async update(
    updateItemExamInputParamDto: UpdateItemExamInputParamDto,
    updateItemExamInputBodyDto: UpdateItemExamInputBodyDto,
  ): Promise<UpdateItemExamOutputDto> {
    const itemExam = await this.prisma.itemExam.findUnique({
      where: {
        id: updateItemExamInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
      },
    });

    if (!itemExam) {
      throw new NotFoundException(`Item Exam not found`);
    }

    const updatedItemExam = await this.prisma.itemExam.update({
      where: { id: updateItemExamInputParamDto.id, deletedAt: null },
      data: { deletedAt: updateItemExamInputBodyDto.deletedAt },
      include: {
        itemCatalogExam: {
          select: {
            id: true,
            itemId: true,
            accountId: true,
            name: true,
            title: true,
            description: true,
            price: true,
            costPrice: true,
            flagBenefit: true,
            duration: true,
            bodyMembers: true,
            typeExam: true,
            protocol: true,
            indications: true,
            observationForProfessional: true,
            observationForPatient: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            item: {
              select: {
                id: true,
                accountId: true,
                supplierId: true,
                name: true,
                description: true,
                category: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
      },
    });

    return {
      id: updatedItemExam.id,
      accountId: updatedItemExam.accountId,
      itemId: updatedItemExam.itemId,
      itemCatalogExamId: updatedItemExam.itemCatalogExamId,
      itemCatalogServiceId: updatedItemExam.itemCatalogServiceId,
      createdAt: updatedItemExam.createdAt,
      updatedAt: updatedItemExam.updatedAt,
      deletedAt: updatedItemExam.deletedAt,
      itemCatalogExam: {
        ...updatedItemExam.itemCatalogExam,
        price: Number(updatedItemExam.itemCatalogExam.price),
        costPrice: Number(updatedItemExam.itemCatalogExam.costPrice),
      },
    };
  }
}
