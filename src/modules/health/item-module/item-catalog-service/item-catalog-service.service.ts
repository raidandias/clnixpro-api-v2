import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemCatalogServiceInputBodyDto } from './dto/input/create-item-catalog-service-input-body.dto';
import { CreateItemCatalogServiceOutputDto } from './dto/output/create-item-catalog-service-output.dto';
import {
  UpdateItemCatalogServiceInputBodyDto,
  UpdateItemCatalogServiceInputParamDto,
} from './dto/input/update-item-catalog-service-input-param-hibrido.dto';
import { UpdateItemCatalogServiceOutputDto } from './dto/output/update-item-catalog-service-output.dto';
import { FindAllItemCatalogServiceOutputDto } from './dto/output/find-all-item-catalog-service-output.dto';
import { FindOneItemCatalogServiceInputParamDto } from './dto/input/find-one-item-catalog-service-input-param.dto';
import { FindOneItemCatalogServiceOutputDto } from './dto/output/find-one-item-catalog-service-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemCatalogServiceInputQueryDto } from './dto/input/find-all-item-catalog-service-input-query.dto';
import { ItemCategory } from '@prisma/client';
import { ItemService } from '../item/item.service';

@Injectable()
export class ItemCatalogServiceService {
  constructor(
    private prisma: PrismaService,
    private itemService: ItemService,
  ) {}

  async create(
    createItemCatalogServiceInputBodyDto: CreateItemCatalogServiceInputBodyDto,
  ): Promise<CreateItemCatalogServiceOutputDto> {
    const { itemId, accountId, ...service } =
      createItemCatalogServiceInputBodyDto;

    const item = await this.itemService.findOne({ id: itemId });
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    if (item.category !== ItemCategory.SERVICE) {
      throw new NotFoundException(`Item is not a service`);
    }

    const itemCatalogService = await this.prisma.itemCatalog.create({
      data: {
        accountId: accountId,
        itemId: itemId,
        name: service.name,
        title: service.title,
        description: service.description,
        price: Number(service.price),
        costPrice: Number(service.costPrice),
        flagBenefit: service.flagBenefit,
        duration: service.duration,
        bodyMembers: service.bodyMembers,
        observationForPatient: service.observationForPatient,
        observationForProfessional: service.observationForProfessional,
      },
      include: {
        item: true,
        itemInstrumentsService: {
          where: { deletedAt: null },
          select: {
            itemCatalogProduct: {
              select: {
                id: true,
                itemId: true,
                accountId: true,
                name: true,
                title: true,
                description: true,
                price: true,
                costPrice: true,
                manufacturer: true,
                expiryAt: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
        itemExamsService: {
          where: { deletedAt: null },
          select: {
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
                observationForPatient: true,
                observationForProfessional: true,
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
      id: itemCatalogService.id,
      itemId: itemCatalogService.itemId,
      accountId: itemCatalogService.accountId,
      name: itemCatalogService.name,
      title: itemCatalogService.title,
      description: itemCatalogService.description,
      price: Number(itemCatalogService.price),
      costPrice: Number(itemCatalogService.costPrice),
      flagBenefit: itemCatalogService.flagBenefit,
      duration: itemCatalogService.duration,
      bodyMembers: itemCatalogService.bodyMembers,
      observationForPatient: itemCatalogService.observationForPatient,
      observationForProfessional: itemCatalogService.observationForProfessional,
      createdAt: itemCatalogService.createdAt,
      updatedAt: itemCatalogService.updatedAt,
      deletedAt: itemCatalogService.deletedAt,
      item: itemCatalogService.item,
      itemInstruments: itemCatalogService.itemInstrumentsService.map(
        (itemInstrumentsProduct) => ({
          id: itemInstrumentsProduct.itemCatalogProduct.id,
          itemId: itemInstrumentsProduct.itemCatalogProduct.itemId,
          accountId: itemInstrumentsProduct.itemCatalogProduct.accountId,
          name: itemInstrumentsProduct.itemCatalogProduct.name,
          title: itemInstrumentsProduct.itemCatalogProduct.title,
          description: itemInstrumentsProduct.itemCatalogProduct.description,
          price: Number(itemInstrumentsProduct.itemCatalogProduct.price),
          costPrice: Number(
            itemInstrumentsProduct.itemCatalogProduct.costPrice,
          ),
          manufacturer: itemInstrumentsProduct.itemCatalogProduct.manufacturer,
          expiryAt: itemInstrumentsProduct.itemCatalogProduct.expiryAt,
          createdAt: itemInstrumentsProduct.itemCatalogProduct.createdAt,
          updatedAt: itemInstrumentsProduct.itemCatalogProduct.updatedAt,
          deletedAt: itemInstrumentsProduct.itemCatalogProduct.deletedAt,
        }),
      ),
      itemExams: itemCatalogService.itemExamsService.map(
        (itemExamsProduct) => ({
          id: itemExamsProduct.itemCatalogExam.id,
          itemId: itemExamsProduct.itemCatalogExam.itemId,
          accountId: itemExamsProduct.itemCatalogExam.accountId,
          name: itemExamsProduct.itemCatalogExam.name,
          title: itemExamsProduct.itemCatalogExam.title,
          description: itemExamsProduct.itemCatalogExam.description,
          price: Number(itemExamsProduct.itemCatalogExam.price),
          costPrice: Number(itemExamsProduct.itemCatalogExam.costPrice),
          flagBenefit: itemExamsProduct.itemCatalogExam.flagBenefit,
          duration: itemExamsProduct.itemCatalogExam.duration,
          bodyMembers: itemExamsProduct.itemCatalogExam.bodyMembers,
          typeExam: itemExamsProduct.itemCatalogExam.typeExam,
          protocol: itemExamsProduct.itemCatalogExam.protocol,
          indications: itemExamsProduct.itemCatalogExam.indications,
          observationForPatient:
            itemExamsProduct.itemCatalogExam.observationForPatient,
          observationForProfessional:
            itemExamsProduct.itemCatalogExam.observationForProfessional,
          createdAt: itemExamsProduct.itemCatalogExam.createdAt,
          updatedAt: itemExamsProduct.itemCatalogExam.updatedAt,
          deletedAt: itemExamsProduct.itemCatalogExam.deletedAt,
        }),
      ),
    };
  }

  async findAll(
    findAllItemCatalogServiceInputQueryDto: FindAllItemCatalogServiceInputQueryDto,
  ): Promise<FindAllItemCatalogServiceOutputDto> {
    const { page, perPage, flagBenefit, ...queryFilters } =
      findAllItemCatalogServiceInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemCatalogService, totalItems] = await Promise.all([
      this.prisma.itemCatalog.findMany({
        where: {
          ...queryFilters,
          flagBenefit:
            flagBenefit == 'true'
              ? true
              : flagBenefit == 'false'
                ? false
                : undefined,
          deletedAt: null,
          item: { category: ItemCategory.SERVICE, deletedAt: null },
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          item: true,
          itemInstrumentsService: {
            where: { deletedAt: null },
            select: {
              itemCatalogProduct: {
                select: {
                  id: true,
                  itemId: true,
                  accountId: true,
                  name: true,
                  title: true,
                  description: true,
                  price: true,
                  costPrice: true,
                  manufacturer: true,
                  expiryAt: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
            },
          },
          itemExamsService: {
            where: { deletedAt: null },
            select: {
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
                  observationForPatient: true,
                  observationForProfessional: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.itemCatalog.count({
        where: {
          ...queryFilters,
          deletedAt: null,
          item: { category: ItemCategory.SERVICE, deletedAt: null },
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const mappedItemCatalogService = itemCatalogService.map(
      (itemCatalogService) => ({
        id: itemCatalogService.id,
        itemId: itemCatalogService.itemId,
        accountId: itemCatalogService.accountId,
        name: itemCatalogService.name,
        title: itemCatalogService.title,
        description: itemCatalogService.description,
        price: Number(itemCatalogService.price),
        costPrice: Number(itemCatalogService.costPrice),
        flagBenefit: itemCatalogService.flagBenefit,
        duration: itemCatalogService.duration,
        bodyMembers: itemCatalogService.bodyMembers,
        observationForPatient: itemCatalogService.observationForPatient,
        observationForProfessional:
          itemCatalogService.observationForProfessional,
        createdAt: itemCatalogService.createdAt,
        updatedAt: itemCatalogService.updatedAt,
        deletedAt: itemCatalogService.deletedAt,
        item: itemCatalogService.item,
        itemInstruments: itemCatalogService.itemInstrumentsService.map(
          (itemInstrumentsProduct) => ({
            id: itemInstrumentsProduct.itemCatalogProduct.id,
            itemId: itemInstrumentsProduct.itemCatalogProduct.itemId,
            accountId: itemInstrumentsProduct.itemCatalogProduct.accountId,
            name: itemInstrumentsProduct.itemCatalogProduct.name,
            title: itemInstrumentsProduct.itemCatalogProduct.title,
            description: itemInstrumentsProduct.itemCatalogProduct.description,
            price: Number(itemInstrumentsProduct.itemCatalogProduct.price),
            costPrice: Number(
              itemInstrumentsProduct.itemCatalogProduct.costPrice,
            ),
            manufacturer:
              itemInstrumentsProduct.itemCatalogProduct.manufacturer,
            expiryAt: itemInstrumentsProduct.itemCatalogProduct.expiryAt,
            createdAt: itemInstrumentsProduct.itemCatalogProduct.createdAt,
            updatedAt: itemInstrumentsProduct.itemCatalogProduct.updatedAt,
            deletedAt: itemInstrumentsProduct.itemCatalogProduct.deletedAt,
          }),
        ),
        itemExams: itemCatalogService.itemExamsService.map(
          (itemExamsProduct) => ({
            id: itemExamsProduct.itemCatalogExam.id,
            itemId: itemExamsProduct.itemCatalogExam.itemId,
            accountId: itemExamsProduct.itemCatalogExam.accountId,
            name: itemExamsProduct.itemCatalogExam.name,
            title: itemExamsProduct.itemCatalogExam.title,
            description: itemExamsProduct.itemCatalogExam.description,
            price: Number(itemExamsProduct.itemCatalogExam.price),
            costPrice: Number(itemExamsProduct.itemCatalogExam.costPrice),
            flagBenefit: itemExamsProduct.itemCatalogExam.flagBenefit,
            duration: itemExamsProduct.itemCatalogExam.duration,
            bodyMembers: itemExamsProduct.itemCatalogExam.bodyMembers,
            typeExam: itemExamsProduct.itemCatalogExam.typeExam,
            protocol: itemExamsProduct.itemCatalogExam.protocol,
            indications: itemExamsProduct.itemCatalogExam.indications,
            observationForPatient:
              itemExamsProduct.itemCatalogExam.observationForPatient,
            observationForProfessional:
              itemExamsProduct.itemCatalogExam.observationForProfessional,
            createdAt: itemExamsProduct.itemCatalogExam.createdAt,
            updatedAt: itemExamsProduct.itemCatalogExam.updatedAt,
            deletedAt: itemExamsProduct.itemCatalogExam.deletedAt,
          }),
        ),
      }),
    );

    const response: FindAllItemCatalogServiceOutputDto = {
      data: mappedItemCatalogService,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemCatalogServiceInputParamDto: FindOneItemCatalogServiceInputParamDto,
  ): Promise<FindOneItemCatalogServiceOutputDto> {
    const itemCatalogService = await this.prisma.itemCatalog.findUnique({
      where: {
        id: findOneItemCatalogServiceInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.SERVICE, deletedAt: null },
      },
      include: {
        item: true,
        itemInstrumentsService: {
          where: { deletedAt: null },
          select: {
            itemCatalogProduct: {
              select: {
                id: true,
                itemId: true,
                accountId: true,
                name: true,
                title: true,
                description: true,
                price: true,
                costPrice: true,
                manufacturer: true,
                expiryAt: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
        itemExamsService: {
          where: { deletedAt: null },
          select: {
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
                observationForPatient: true,
                observationForProfessional: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
      },
    });

    if (!itemCatalogService) {
      throw new NotFoundException(`Item Service not found`);
    }

    return {
      id: itemCatalogService.id,
      itemId: itemCatalogService.itemId,
      accountId: itemCatalogService.accountId,
      name: itemCatalogService.name,
      title: itemCatalogService.title,
      description: itemCatalogService.description,
      price: Number(itemCatalogService.price),
      costPrice: Number(itemCatalogService.costPrice),
      flagBenefit: itemCatalogService.flagBenefit,
      duration: itemCatalogService.duration,
      bodyMembers: itemCatalogService.bodyMembers,
      observationForPatient: itemCatalogService.observationForPatient,
      observationForProfessional: itemCatalogService.observationForProfessional,
      createdAt: itemCatalogService.createdAt,
      updatedAt: itemCatalogService.updatedAt,
      deletedAt: itemCatalogService.deletedAt,
      item: itemCatalogService.item,
      itemInstruments: itemCatalogService.itemInstrumentsService.map(
        (itemInstrumentsProduct) => ({
          id: itemInstrumentsProduct.itemCatalogProduct.id,
          itemId: itemInstrumentsProduct.itemCatalogProduct.itemId,
          accountId: itemInstrumentsProduct.itemCatalogProduct.accountId,
          name: itemInstrumentsProduct.itemCatalogProduct.name,
          title: itemInstrumentsProduct.itemCatalogProduct.title,
          description: itemInstrumentsProduct.itemCatalogProduct.description,
          price: Number(itemInstrumentsProduct.itemCatalogProduct.price),
          costPrice: Number(
            itemInstrumentsProduct.itemCatalogProduct.costPrice,
          ),
          manufacturer: itemInstrumentsProduct.itemCatalogProduct.manufacturer,
          expiryAt: itemInstrumentsProduct.itemCatalogProduct.expiryAt,
          createdAt: itemInstrumentsProduct.itemCatalogProduct.createdAt,
          updatedAt: itemInstrumentsProduct.itemCatalogProduct.updatedAt,
          deletedAt: itemInstrumentsProduct.itemCatalogProduct.deletedAt,
        }),
      ),
      itemExams: itemCatalogService.itemExamsService.map(
        (itemExamsProduct) => ({
          id: itemExamsProduct.itemCatalogExam.id,
          itemId: itemExamsProduct.itemCatalogExam.itemId,
          accountId: itemExamsProduct.itemCatalogExam.accountId,
          name: itemExamsProduct.itemCatalogExam.name,
          title: itemExamsProduct.itemCatalogExam.title,
          description: itemExamsProduct.itemCatalogExam.description,
          price: Number(itemExamsProduct.itemCatalogExam.price),
          costPrice: Number(itemExamsProduct.itemCatalogExam.costPrice),
          flagBenefit: itemExamsProduct.itemCatalogExam.flagBenefit,
          duration: itemExamsProduct.itemCatalogExam.duration,
          bodyMembers: itemExamsProduct.itemCatalogExam.bodyMembers,
          typeExam: itemExamsProduct.itemCatalogExam.typeExam,
          protocol: itemExamsProduct.itemCatalogExam.protocol,
          indications: itemExamsProduct.itemCatalogExam.indications,
          observationForPatient:
            itemExamsProduct.itemCatalogExam.observationForPatient,
          observationForProfessional:
            itemExamsProduct.itemCatalogExam.observationForProfessional,
          createdAt: itemExamsProduct.itemCatalogExam.createdAt,
          updatedAt: itemExamsProduct.itemCatalogExam.updatedAt,
          deletedAt: itemExamsProduct.itemCatalogExam.deletedAt,
        }),
      ),
    };
  }

  async update(
    updateItemCatalogServiceInputParamDto: UpdateItemCatalogServiceInputParamDto,
    updateItemCatalogServiceInputBodyDto: UpdateItemCatalogServiceInputBodyDto,
  ): Promise<UpdateItemCatalogServiceOutputDto> {
    const itemCatalogService = await this.prisma.itemCatalog.findUnique({
      where: {
        id: updateItemCatalogServiceInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.SERVICE, deletedAt: null },
      },
    });

    if (!itemCatalogService) {
      throw new NotFoundException(`Item Service not found`);
    }

    const updatedItemCatalogService = await this.prisma.itemCatalog.update({
      where: {
        id: updateItemCatalogServiceInputParamDto.id,
        deletedAt: null,
      },
      data: {
        accountId: updateItemCatalogServiceInputBodyDto.accountId,
        name: updateItemCatalogServiceInputBodyDto.name,
        title: updateItemCatalogServiceInputBodyDto.title,
        description: updateItemCatalogServiceInputBodyDto.description,
        price: Number(updateItemCatalogServiceInputBodyDto.price),
        costPrice: Number(updateItemCatalogServiceInputBodyDto.costPrice),
        flagBenefit: updateItemCatalogServiceInputBodyDto.flagBenefit,
        duration: updateItemCatalogServiceInputBodyDto.duration,
        bodyMembers: updateItemCatalogServiceInputBodyDto.bodyMembers,
        observationForPatient:
          updateItemCatalogServiceInputBodyDto.observationForPatient,
        observationForProfessional:
          updateItemCatalogServiceInputBodyDto.observationForProfessional,
      },
      include: {
        item: true,
        itemInstrumentsService: {
          where: { deletedAt: null },
          select: {
            itemCatalogProduct: {
              select: {
                id: true,
                itemId: true,
                accountId: true,
                name: true,
                title: true,
                description: true,
                price: true,
                costPrice: true,
                manufacturer: true,
                expiryAt: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
              },
            },
          },
        },
        itemExamsService: {
          where: { deletedAt: null },
          select: {
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
                observationForPatient: true,
                observationForProfessional: true,
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
      id: updatedItemCatalogService.id,
      itemId: updatedItemCatalogService.itemId,
      accountId: updatedItemCatalogService.accountId,
      name: updatedItemCatalogService.name,
      title: updatedItemCatalogService.title,
      description: updatedItemCatalogService.description,
      price: Number(updatedItemCatalogService.price),
      costPrice: Number(updatedItemCatalogService.costPrice),
      flagBenefit: updatedItemCatalogService.flagBenefit,
      duration: updatedItemCatalogService.duration,
      bodyMembers: updatedItemCatalogService.bodyMembers,
      observationForPatient: updatedItemCatalogService.observationForPatient,
      observationForProfessional:
        updatedItemCatalogService.observationForProfessional,
      createdAt: updatedItemCatalogService.createdAt,
      updatedAt: updatedItemCatalogService.updatedAt,
      deletedAt: updatedItemCatalogService.deletedAt,
      item: updatedItemCatalogService.item,
      itemInstruments: updatedItemCatalogService.itemInstrumentsService.map(
        (itemInstrumentsProduct) => ({
          id: itemInstrumentsProduct.itemCatalogProduct.id,
          itemId: itemInstrumentsProduct.itemCatalogProduct.itemId,
          accountId: itemInstrumentsProduct.itemCatalogProduct.accountId,
          name: itemInstrumentsProduct.itemCatalogProduct.name,
          title: itemInstrumentsProduct.itemCatalogProduct.title,
          description: itemInstrumentsProduct.itemCatalogProduct.description,
          price: Number(itemInstrumentsProduct.itemCatalogProduct.price),
          costPrice: Number(
            itemInstrumentsProduct.itemCatalogProduct.costPrice,
          ),
          manufacturer: itemInstrumentsProduct.itemCatalogProduct.manufacturer,
          expiryAt: itemInstrumentsProduct.itemCatalogProduct.expiryAt,
          createdAt: itemInstrumentsProduct.itemCatalogProduct.createdAt,
          updatedAt: itemInstrumentsProduct.itemCatalogProduct.updatedAt,
          deletedAt: itemInstrumentsProduct.itemCatalogProduct.deletedAt,
        }),
      ),
      itemExams: updatedItemCatalogService.itemExamsService.map(
        (itemExamsProduct) => ({
          id: itemExamsProduct.itemCatalogExam.id,
          itemId: itemExamsProduct.itemCatalogExam.itemId,
          accountId: itemExamsProduct.itemCatalogExam.accountId,
          name: itemExamsProduct.itemCatalogExam.name,
          title: itemExamsProduct.itemCatalogExam.title,
          description: itemExamsProduct.itemCatalogExam.description,
          price: Number(itemExamsProduct.itemCatalogExam.price),
          costPrice: Number(itemExamsProduct.itemCatalogExam.costPrice),
          flagBenefit: itemExamsProduct.itemCatalogExam.flagBenefit,
          duration: itemExamsProduct.itemCatalogExam.duration,
          bodyMembers: itemExamsProduct.itemCatalogExam.bodyMembers,
          typeExam: itemExamsProduct.itemCatalogExam.typeExam,
          protocol: itemExamsProduct.itemCatalogExam.protocol,
          indications: itemExamsProduct.itemCatalogExam.indications,
          observationForPatient:
            itemExamsProduct.itemCatalogExam.observationForPatient,
          observationForProfessional:
            itemExamsProduct.itemCatalogExam.observationForProfessional,
          createdAt: itemExamsProduct.itemCatalogExam.createdAt,
          updatedAt: itemExamsProduct.itemCatalogExam.updatedAt,
          deletedAt: itemExamsProduct.itemCatalogExam.deletedAt,
        }),
      ),
    };
  }
}
