import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemCatalogProductInputBodyDto } from './dto/input/create-item-catalog-product-input-body.dto';
import { CreateItemCatalogProductOutputDto } from './dto/output/create-item-catalog-product-output.dto';
import {
  UpdateItemCatalogProductInputBodyDto,
  UpdateItemCatalogProductInputParamDto,
} from './dto/input/update-item-catalog-product-input-param-hibrido.dto';
import { UpdateItemCatalogProductOutputDto } from './dto/output/update-item-catalog-product-output.dto';
import { FindAllItemCatalogProductOutputDto } from './dto/output/find-all-item-catalog-product-output.dto';
import { FindOneItemCatalogProductInputParamDto } from './dto/input/find-one-item-catalog-product-input-param.dto';
import { FindOneItemCatalogProductOutputDto } from './dto/output/find-one-item-catalog-product-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemCatalogProductInputQueryDto } from './dto/input/find-all-item-catalog-product-input-query.dto';
import { ItemCategory } from '@prisma/client';
import { ItemService } from '../item/item.service';
import { FindOneItemHealthInsuranceOutputDto } from '../item-health-insurance/dto/output/find-one-item-health-insurance-output.dto';

@Injectable()
export class ItemCatalogProductService {
  constructor(
    private prisma: PrismaService,
    private itemService: ItemService,
  ) {}

  async create(
    createItemCatalogProductInputBodyDto: CreateItemCatalogProductInputBodyDto,
  ): Promise<CreateItemCatalogProductOutputDto> {
    const { itemId, accountId, ...product } =
      createItemCatalogProductInputBodyDto;

    const item = await this.itemService.findOne({ id: itemId });
    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    if (item.category !== ItemCategory.PRODUCT) {
      throw new NotFoundException(`Item is not a product`);
    }

    const itemCatalogProduct = await this.prisma.itemCatalog.create({
      data: {
        accountId: accountId,
        itemId: itemId,
        name: product.name,
        title: product.title,
        description: product.description,
        price: product.price,
        costPrice: product.costPrice,
        manufacturer: product.manufacturer,
        expiryAt: new Date(product.expiryAt),
      },
      include: { item: true },
    });

    return {
      id: itemCatalogProduct.id,
      itemId: itemCatalogProduct.itemId,
      accountId: itemCatalogProduct.accountId,
      name: itemCatalogProduct.name,
      title: itemCatalogProduct.title,
      description: itemCatalogProduct.description,
      price: Number(itemCatalogProduct.price),
      costPrice: Number(itemCatalogProduct.costPrice),
      manufacturer: itemCatalogProduct.manufacturer,
      expiryAt: itemCatalogProduct.expiryAt,
      createdAt: itemCatalogProduct.createdAt,
      updatedAt: itemCatalogProduct.updatedAt,
      deletedAt: itemCatalogProduct.deletedAt,
      item: itemCatalogProduct.item,
    };
  }

  async findAll(
    findAllItemCatalogProductInputQueryDto: FindAllItemCatalogProductInputQueryDto,
  ): Promise<FindAllItemCatalogProductOutputDto> {
    const { page, perPage, ...queryFilters } =
      findAllItemCatalogProductInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [itemCatalogProduct, totalItems] = await Promise.all([
      this.prisma.itemCatalog.findMany({
        where: {
          ...queryFilters,
          deletedAt: null,
          item: { category: ItemCategory.PRODUCT, deletedAt: null },
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: { createdAt: 'desc' },
        include: { item: true },
      }),
      this.prisma.itemCatalog.count({
        where: {
          ...queryFilters,
          deletedAt: null,
          item: { category: ItemCategory.PRODUCT, deletedAt: null },
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const mappedItemCatalogProducts = itemCatalogProduct.map(
      (itemCatalogProduct) => ({
        id: itemCatalogProduct.id,
        itemId: itemCatalogProduct.itemId,
        accountId: itemCatalogProduct.accountId,
        name: itemCatalogProduct.name,
        title: itemCatalogProduct.title,
        description: itemCatalogProduct.description,
        price: Number(itemCatalogProduct.price),
        costPrice: Number(itemCatalogProduct.costPrice),
        manufacturer: itemCatalogProduct.manufacturer,
        expiryAt: itemCatalogProduct.expiryAt,
        createdAt: itemCatalogProduct.createdAt,
        updatedAt: itemCatalogProduct.updatedAt,
        deletedAt: itemCatalogProduct.deletedAt,
        item: itemCatalogProduct.item,
      }),
    );

    const response: FindAllItemCatalogProductOutputDto = {
      data: mappedItemCatalogProducts,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemCatalogProductInputParamDto: FindOneItemCatalogProductInputParamDto,
  ): Promise<FindOneItemCatalogProductOutputDto> {
    const itemCatalogProduct = await this.prisma.itemCatalog.findUnique({
      where: {
        id: findOneItemCatalogProductInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
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

    if (!itemCatalogProduct) {
      throw new NotFoundException(`Product not found`);
    }

    const insurances: FindOneItemHealthInsuranceOutputDto[] =
      itemCatalogProduct.itemHealthInsurances.map((insurance) => ({
        ...insurance,
        paymentValue: Number(insurance.paymentValue),
        item: insurance.item,
        healthInsurance: {
          ...insurance.healthInsurance,
          costPrice: Number(insurance.healthInsurance.costPrice),
        },
      }));

    return {
      id: itemCatalogProduct.id,
      itemId: itemCatalogProduct.itemId,
      accountId: itemCatalogProduct.accountId,
      name: itemCatalogProduct.name,
      title: itemCatalogProduct.title,
      description: itemCatalogProduct.description,
      price: Number(itemCatalogProduct.price),
      costPrice: Number(itemCatalogProduct.costPrice),
      manufacturer: itemCatalogProduct.manufacturer,
      expiryAt: itemCatalogProduct.expiryAt,
      createdAt: itemCatalogProduct.createdAt,
      updatedAt: itemCatalogProduct.updatedAt,
      deletedAt: itemCatalogProduct.deletedAt,
      item: itemCatalogProduct.item,
      itemHealthInsurances: insurances,
    };
  }

  async update(
    updateItemCatalogProductInputParamDto: UpdateItemCatalogProductInputParamDto,
    updateItemCatalogProductInputBodyDto: UpdateItemCatalogProductInputBodyDto,
  ): Promise<UpdateItemCatalogProductOutputDto> {
    const itemCatalogProduct = await this.prisma.itemCatalog.findUnique({
      where: {
        id: updateItemCatalogProductInputParamDto.id,
        deletedAt: null,
        item: { category: ItemCategory.PRODUCT, deletedAt: null },
      },
    });

    if (!itemCatalogProduct) {
      throw new NotFoundException(`Product not found`);
    }

    const updatedItemCatalogProduct = await this.prisma.itemCatalog.update({
      where: {
        id: updateItemCatalogProductInputParamDto.id,
        deletedAt: null,
      },
      data: {
        accountId: updateItemCatalogProductInputBodyDto.accountId,
        name: updateItemCatalogProductInputBodyDto.name,
        title: updateItemCatalogProductInputBodyDto.title,
        description: updateItemCatalogProductInputBodyDto.description,
        price: !isNaN(updateItemCatalogProductInputBodyDto.price)
          ? updateItemCatalogProductInputBodyDto.price
          : 0.0,
        costPrice: !isNaN(updateItemCatalogProductInputBodyDto.costPrice)
          ? updateItemCatalogProductInputBodyDto.costPrice
          : 0.0,
        manufacturer: updateItemCatalogProductInputBodyDto.manufacturer,
        expiryAt: new Date(updateItemCatalogProductInputBodyDto.expiryAt),
      },
      include: { item: true },
    });

    return {
      id: updatedItemCatalogProduct.id,
      itemId: updatedItemCatalogProduct.itemId,
      accountId: updatedItemCatalogProduct.accountId,
      name: updatedItemCatalogProduct.name,
      title: updatedItemCatalogProduct.title,
      description: updatedItemCatalogProduct.description,
      price: Number(updatedItemCatalogProduct.price),
      costPrice: Number(updatedItemCatalogProduct.costPrice),
      manufacturer: updatedItemCatalogProduct.manufacturer,
      expiryAt: updatedItemCatalogProduct.expiryAt,
      createdAt: updatedItemCatalogProduct.createdAt,
      updatedAt: updatedItemCatalogProduct.updatedAt,
      deletedAt: updatedItemCatalogProduct.deletedAt,
      item: updatedItemCatalogProduct.item,
    };
  }
}
