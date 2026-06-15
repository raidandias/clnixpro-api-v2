import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemHealthInsuranceInputBodyArrayDto } from './dto/input/create-item-health-insurance-input-body.dto';
import { CreateItemHealthInsuranceOutputDto } from './dto/output/create-item-health-insurance-output.dto';
import {
  UpdateItemHealthInsuranceInputBodyDto,
  UpdateItemHealthInsuranceInputParamDto,
} from './dto/input/update-item-health-insurance-input-param-hibrido.dto';
import { UpdateItemHealthInsuranceOutputDto } from './dto/output/update-item-health-insurance-output.dto';
import { FindAllItemHealthInsuranceOutputDto } from './dto/output/find-all-item-health-insurance-output.dto';
import { FindOneItemHealthInsuranceInputParamDto } from './dto/input/find-one-item-health-insurance-input-param.dto';
import { FindOneItemHealthInsuranceOutputDto } from './dto/output/find-one-item-health-insurance-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemHealthInsuranceInputQueryDto } from './dto/input/find-all-item-health-insurance-input-query.dto';
import { isNumber } from 'class-validator';
import { ItemService } from '../item/item.service';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';
import { ItemCatalogExamService } from '../item-catalog-exam/item-catalog-exam.service';

@Injectable()
export class ItemHealthInsuranceService {
  constructor(
    private prisma: PrismaService,
    private itemService: ItemService,
    private itemCatalogProductService: ItemCatalogProductService,
    private itemCatalogServiceService: ItemCatalogServiceService,
    private itemCatalogExamService: ItemCatalogExamService,
  ) {}

  async create(
    createItemHealthInsuranceInputBodyDto: CreateItemHealthInsuranceInputBodyArrayDto,
  ): Promise<CreateItemHealthInsuranceOutputDto[]> {
    const seenKeys = new Set();

    const itemInsurance = await Promise.all(
      createItemHealthInsuranceInputBodyDto.data.map(async (itemInsurance) => {
        const {
          accountId,
          itemId,
          itemCatalogId,
          healthInsuranceId,
          paymentValue,
        } = itemInsurance;

        const key = `${accountId}_${itemId}_${itemCatalogId}_${healthInsuranceId}`;
        if (seenKeys.has(key)) {
          return null;
        }
        seenKeys.add(key);

        const item = await this.itemService.findOne({ id: itemId });
        if (!item) {
          throw new NotFoundException(`Item not found`);
        }

        const itemCatalogProduct = await this.itemCatalogProductService.findAll(
          {
            id: itemCatalogId,
            page: '1',
            perPage: '1',
          },
        );

        const itemCatalogService = await this.itemCatalogServiceService.findAll(
          {
            id: itemCatalogId,
            page: '1',
            perPage: '1',
          },
        );

        const itemCatalogExam = await this.itemCatalogExamService.findAll({
          id: itemCatalogId,
          page: '1',
          perPage: '1',
        });

        if (!itemCatalogProduct && !itemCatalogService && !itemCatalogExam) {
          throw new NotFoundException(
            `Item Product, Service ou Exam not found`,
          );
        }

        const checkItemHealthInsuranceExists =
          await this.prisma.itemHealthInsurance.findFirst({
            where: {
              accountId: accountId,
              itemId: itemId,
              itemCatalogId: itemCatalogId,
              healthInsuranceId: healthInsuranceId,
              deletedAt: null,
            },
            include: {
              item: true,
              healthInsurance: true,
            },
          });

        let itemHealthInsurance;

        if (checkItemHealthInsuranceExists) {
          itemHealthInsurance = await this.prisma.itemHealthInsurance.update({
            where: {
              id: checkItemHealthInsuranceExists.id,
            },
            data: {
              healthInsuranceId: healthInsuranceId,
              paymentValue: isNumber(paymentValue) ? Number(paymentValue) : 0.0,
            },
            include: {
              item: true,
              healthInsurance: true,
            },
          });
        } else {
          itemHealthInsurance = await this.prisma.itemHealthInsurance.create({
            data: {
              accountId: accountId,
              itemId: itemId,
              itemCatalogId: itemCatalogId,
              healthInsuranceId: healthInsuranceId,
              paymentValue: isNumber(paymentValue) ? Number(paymentValue) : 0.0,
            },
            include: {
              item: true,
              healthInsurance: true,
            },
          });
        }

        let catalogData = null;
        if (itemCatalogProduct?.data?.length > 0) {
          catalogData = {
            ...itemCatalogProduct.data[0],
            type: 'PRODUCT',
          };
        } else if (itemCatalogService?.data?.length > 0) {
          catalogData = {
            ...itemCatalogService.data[0],
            type: 'SERVICE',
          };
        } else if (itemCatalogExam?.data?.length > 0) {
          catalogData = {
            ...itemCatalogExam.data[0],
            type: 'EXAM',
          };
        }

        return {
          ...itemHealthInsurance,
          paymentValue: Number(itemHealthInsurance.paymentValue),
          item: {
            id: itemHealthInsurance.item.id,
            name: itemHealthInsurance.item.name,
            description: itemHealthInsurance.item.description,
          },
          healthInsurance: {
            id: itemHealthInsurance.healthInsurance.id,
            name: itemHealthInsurance.healthInsurance.name,
            description: itemHealthInsurance.healthInsurance.description,
          },
          catalog: catalogData
            ? {
                id: catalogData.id,
                name: catalogData.name,
                description: catalogData.description,
                type: catalogData.type,
              }
            : null,
        };
      }),
    );

    return itemInsurance.filter((item) => item !== null);
  }

  async findAll(
    findAllItemHealthInsuranceInputQueryDto: FindAllItemHealthInsuranceInputQueryDto,
  ): Promise<FindAllItemHealthInsuranceOutputDto> {
    const { page, perPage, ...queryFilters } =
      findAllItemHealthInsuranceInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemHealthInsurance, totalItems] = await Promise.all([
      this.prisma.itemHealthInsurance.findMany({
        where: {
          accountId: queryFilters.accountId || undefined,
          itemId: queryFilters.itemId || undefined,
          itemCatalogId: queryFilters.itemCatalogId || undefined,
          healthInsuranceId: queryFilters.healthInsuranceId || undefined,
          paymentValue: queryFilters.paymentValue
            ? Number(queryFilters.paymentValue)
            : undefined,
          deletedAt: null,
        },
        include: {
          item: true,
          healthInsurance: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
          {
            updatedAt: 'desc',
          },
        ],
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.itemHealthInsurance.count({
        where: {
          accountId: queryFilters.accountId || undefined,
          itemId: queryFilters.itemId || undefined,
          itemCatalogId: queryFilters.itemCatalogId || undefined,
          healthInsuranceId: queryFilters.healthInsuranceId || undefined,
          paymentValue: queryFilters.paymentValue
            ? Number(queryFilters.paymentValue)
            : undefined,
          deletedAt: null,
        },
      }),
    ]);

    const itemsWithCatalog = await Promise.all(
      itemHealthInsurance.map(async (item) => {
        const itemCatalogProduct = await this.itemCatalogProductService.findAll(
          {
            id: item.itemCatalogId,
            page: '1',
            perPage: '1',
          },
        );

        const itemCatalogService = await this.itemCatalogServiceService.findAll(
          {
            id: item.itemCatalogId,
            page: '1',
            perPage: '1',
          },
        );

        const itemCatalogExam = await this.itemCatalogExamService.findAll({
          id: item.itemCatalogId,
          page: '1',
          perPage: '1',
        });

        let catalogData = null;
        if (itemCatalogProduct?.data?.length > 0) {
          catalogData = {
            ...itemCatalogProduct.data[0],
            type: 'PRODUCT',
          };
        } else if (itemCatalogService?.data?.length > 0) {
          catalogData = {
            ...itemCatalogService.data[0],
            type: 'SERVICE',
          };
        } else if (itemCatalogExam?.data?.length > 0) {
          catalogData = {
            ...itemCatalogExam.data[0],
            type: 'EXAM',
          };
        }

        return {
          id: item.id,
          accountId: item.accountId,
          itemId: item.itemId,
          itemCatalogId: item.itemCatalogId,
          healthInsuranceId: item.healthInsuranceId,
          paymentValue: Number(item.paymentValue),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
          item: {
            ...item.item,
          },
          healthInsurance: {
            ...item.healthInsurance,
            costPrice: Number(item.healthInsurance.costPrice),
          },
        };
      }),
    );

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    return {
      data: itemsWithCatalog,
      pageInfo,
    };
  }

  async findOne(
    findOneItemHealthInsuranceInputParamDto: FindOneItemHealthInsuranceInputParamDto,
  ): Promise<FindOneItemHealthInsuranceOutputDto> {
    const itemHealthInsurance =
      await this.prisma.itemHealthInsurance.findUnique({
        where: {
          id: findOneItemHealthInsuranceInputParamDto.id,
          deletedAt: null,
        },
        include: {
          item: true,
          healthInsurance: true,
        },
      });

    if (!itemHealthInsurance) {
      throw new NotFoundException(`Item Health Insurance not found`);
    }

    return {
      id: itemHealthInsurance.id,
      accountId: itemHealthInsurance.accountId,
      itemId: itemHealthInsurance.itemId,
      itemCatalogId: itemHealthInsurance.itemCatalogId,
      healthInsuranceId: itemHealthInsurance.healthInsuranceId,
      paymentValue: Number(itemHealthInsurance.paymentValue),
      createdAt: itemHealthInsurance.createdAt,
      updatedAt: itemHealthInsurance.updatedAt,
      deletedAt: itemHealthInsurance.deletedAt,
      item: itemHealthInsurance.item,
      healthInsurance: {
        ...itemHealthInsurance.healthInsurance,
        costPrice: Number(itemHealthInsurance.healthInsurance.costPrice),
      },
    };
  }

  async update(
    updateItemHealthInsuranceInputParamDto: UpdateItemHealthInsuranceInputParamDto,
    updateItemHealthInsuranceInputBodyDto: UpdateItemHealthInsuranceInputBodyDto,
  ): Promise<UpdateItemHealthInsuranceOutputDto> {
    const itemHealthInsurance =
      await this.prisma.itemHealthInsurance.findUnique({
        where: {
          id: updateItemHealthInsuranceInputParamDto.id,
          deletedAt: null,
        },
        include: {
          item: true,
          healthInsurance: true,
        },
      });

    if (!itemHealthInsurance) {
      throw new NotFoundException(`Item Health Insurance not found`);
    }

    const updatedItemHealthInsurance =
      await this.prisma.itemHealthInsurance.update({
        where: {
          id: updateItemHealthInsuranceInputParamDto.id,
          deletedAt: null,
        },
        data: {
          accountId:
            updateItemHealthInsuranceInputBodyDto.accountId || undefined,
          itemId: updateItemHealthInsuranceInputBodyDto.itemId || undefined,
          itemCatalogId:
            updateItemHealthInsuranceInputBodyDto.itemCatalogId || undefined,
          healthInsuranceId:
            updateItemHealthInsuranceInputBodyDto.healthInsuranceId ||
            undefined,
          paymentValue: updateItemHealthInsuranceInputBodyDto.paymentValue
            ? Number(updateItemHealthInsuranceInputBodyDto.paymentValue)
            : undefined,
          deletedAt: updateItemHealthInsuranceInputBodyDto.deletedAt
            ? new Date(updateItemHealthInsuranceInputBodyDto.deletedAt)
            : undefined,
        },
        include: {
          item: true,
          healthInsurance: true,
        },
      });

    return {
      id: updatedItemHealthInsurance.id,
      accountId: updatedItemHealthInsurance.accountId,
      itemId: updatedItemHealthInsurance.itemId,
      itemCatalogId: updatedItemHealthInsurance.itemCatalogId,
      healthInsuranceId: updatedItemHealthInsurance.healthInsuranceId,
      paymentValue: Number(updatedItemHealthInsurance.paymentValue),
      createdAt: updatedItemHealthInsurance.createdAt,
      updatedAt: updatedItemHealthInsurance.updatedAt,
      deletedAt: updatedItemHealthInsurance.deletedAt,
      item: itemHealthInsurance.item,
      healthInsurance: {
        ...updatedItemHealthInsurance.healthInsurance,
        costPrice: Number(updatedItemHealthInsurance.healthInsurance.costPrice),
      },
    };
  }
}
