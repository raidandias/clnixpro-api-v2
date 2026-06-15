import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemInstrumentInputBodyArrayDto } from './dto/input/create-item-instrument-input-body.dto';
import { CreateItemInstrumentOutputDto } from './dto/output/create-item-instrument-output.dto';
import {
  UpdateItemInstrumentInputBodyDto,
  UpdateItemInstrumentInputParamDto,
} from './dto/input/update-item-instrument-input-param-hibrido.dto';
import { UpdateItemInstrumentOutputDto } from './dto/output/update-item-instrument-output.dto';
import { FindAllItemInstrumentOutputDto } from './dto/output/find-all-item-instrument-output.dto';
import { FindOneItemInstrumentInputParamDto } from './dto/input/find-one-item-instrument-input-param.dto';
import { FindOneItemInstrumentOutputDto } from './dto/output/find-one-item-instrument-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemInstrumentInputQueryDto } from './dto/input/find-all-item-instrument-input-query.dto';
import { ItemCategory } from '@prisma/client';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';

@Injectable()
export class ItemInstrumentService {
  constructor(
    private prisma: PrismaService,
    private itemCatalogProductService: ItemCatalogProductService,
    private itemCatalogServiceService: ItemCatalogServiceService,
  ) {}

  async create(
    createItemInstrumentInputBodyDto: CreateItemInstrumentInputBodyArrayDto,
  ): Promise<CreateItemInstrumentOutputDto[]> {
    const itemInstruments = await Promise.all(
      createItemInstrumentInputBodyDto.data.map(async (itemInstrument) => {
        const itemCatalogProduct = await this.itemCatalogProductService.findOne(
          {
            id: itemInstrument.itemCatalogProductId,
          },
        );

        if (!itemCatalogProduct) {
          throw new NotFoundException(`Item Product not found`);
        }

        const itemCatalogService = await this.itemCatalogServiceService.findOne(
          {
            id: itemInstrument.itemCatalogServiceId,
          },
        );

        if (!itemCatalogService) {
          throw new NotFoundException(`Item Service not found`);
        }

        const itemInstrumentExists = await this.prisma.itemInstrument.findFirst(
          {
            where: {
              accountId: itemInstrument.accountId,
              itemId: itemInstrument.itemId,
              itemCatalogProductId: itemInstrument.itemCatalogProductId,
              itemCatalogServiceId: itemInstrument.itemCatalogServiceId,
              deletedAt: null,
            },
          },
        );

        if (itemInstrumentExists) {
          throw new NotFoundException(`Item Instrument already exists`);
        }

        const itemInstrumentCreate = await this.prisma.itemInstrument.create({
          data: {
            accountId: itemInstrument.accountId,
            itemCatalogProductId: itemInstrument.itemCatalogProductId,
            itemCatalogServiceId: itemInstrument.itemCatalogServiceId,
            itemId: itemInstrument.itemId,
          },
          include: {
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

        return itemInstrumentCreate;
      }),
    );

    const instrumentMapper: CreateItemInstrumentOutputDto[] =
      itemInstruments.map((item) => ({
        ...item,
        itemCatalogProduct: {
          ...item.itemCatalogProduct,
          costPrice: Number(item.itemCatalogProduct.costPrice),
          price: Number(item.itemCatalogProduct.price),
        },
      }));

    return instrumentMapper;
  }

  async findAll(
    findAllItemInstrumentInputQueryDto: FindAllItemInstrumentInputQueryDto,
  ): Promise<FindAllItemInstrumentOutputDto> {
    const { page, perPage, ...queryFilters } =
      findAllItemInstrumentInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemInstrument, totalItems] = await Promise.all([
      this.prisma.itemInstrument.findMany({
        where: {
          itemId: queryFilters.itemId,
          accountId: queryFilters.accountId,
          itemCatalogProductId: queryFilters.itemCatalogProductId,
          itemCatalogServiceId: queryFilters.itemCatalogServiceId,
          createdAt: queryFilters.createdAt,
          updatedAt: queryFilters.updatedAt,
          deletedAt: null,
          item: { category: ItemCategory.PRODUCT, deletedAt: null },
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
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
      this.prisma.itemInstrument.count({
        where: {
          accountId: queryFilters.accountId,
          itemId: queryFilters.itemId,
          itemCatalogProductId: queryFilters.itemCatalogProductId,
          itemCatalogServiceId: queryFilters.itemCatalogServiceId,
          deletedAt: null,
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const instrumentMapper: FindOneItemInstrumentOutputDto[] =
      itemInstrument.map((item) => ({
        ...item,
        itemCatalogProduct: {
          ...item.itemCatalogProduct,
          costPrice: Number(item.itemCatalogProduct.costPrice),
          price: Number(item.itemCatalogProduct.price),
        },
      }));

    const response: FindAllItemInstrumentOutputDto = {
      data: instrumentMapper,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemInstrumentInputParamDto: FindOneItemInstrumentInputParamDto,
  ): Promise<FindOneItemInstrumentOutputDto> {
    const itemInstrument = await this.prisma.itemInstrument.findUnique({
      where: {
        id: findOneItemInstrumentInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
      },
      include: {
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

    if (!itemInstrument) {
      throw new NotFoundException(`Item Instrument not found`);
    }

    return {
      ...itemInstrument,
      itemCatalogProduct: {
        ...itemInstrument.itemCatalogProduct,
        costPrice: Number(itemInstrument.itemCatalogProduct.costPrice),
        price: Number(itemInstrument.itemCatalogProduct.price),
      },
    };
  }

  async update(
    updateItemInstrumentInputParamDto: UpdateItemInstrumentInputParamDto,
    updateItemInstrumentInputBodyDto: UpdateItemInstrumentInputBodyDto,
  ): Promise<UpdateItemInstrumentOutputDto> {
    const itemInstrument = await this.prisma.itemInstrument.findUnique({
      where: {
        id: updateItemInstrumentInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
      },
    });

    if (!itemInstrument) {
      throw new NotFoundException(`Item Instrument not found`);
    }

    const updatedItemInstrument = await this.prisma.itemInstrument.update({
      where: { id: updateItemInstrumentInputParamDto.id, deletedAt: null },
      data: { deletedAt: updateItemInstrumentInputBodyDto.deletedAt },
      include: {
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
      ...updatedItemInstrument,
      itemCatalogProduct: {
        ...updatedItemInstrument.itemCatalogProduct,
        costPrice: Number(updatedItemInstrument.itemCatalogProduct.costPrice),
        price: Number(updatedItemInstrument.itemCatalogProduct.price),
      },
    };
  }
}
