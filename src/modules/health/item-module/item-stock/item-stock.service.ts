import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemStockInputBodyDto } from './dto/input/create-item-stock-input-body.dto';
import { CreateItemStockOutputDto } from './dto/output/create-item-stock-output.dto';
import {
  UpdateItemStockInputBodyDto,
  UpdateItemStockInputParamDto,
} from './dto/input/update-item-stock-input-param-hibrido.dto';
import { UpdateItemStockOutputDto } from './dto/output/update-item-stock-output.dto';
import { FindAllItemStockOutputDto } from './dto/output/find-all-item-stock-output.dto';
import { FindOneItemStockInputParamDto } from './dto/input/find-one-item-stock-input-param.dto';
import { FindOneItemStockOutputDto } from './dto/output/find-one-item-stock-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemStockInputQueryDto } from './dto/input/find-all-item-stock-input-query.dto';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';

@Injectable()
export class ItemStockService {
  constructor(
    private prisma: PrismaService,
    private itemCatalogProductService: ItemCatalogProductService,
  ) {}

  async create(
    createItemStockInputBodyDto: CreateItemStockInputBodyDto,
  ): Promise<CreateItemStockOutputDto> {
    const itemCatalogProduct = await this.itemCatalogProductService.findOne({
      id: createItemStockInputBodyDto.itemCatalogId,
    });

    if (!itemCatalogProduct) {
      throw new NotFoundException(`Product not found`);
    }

    const createdItemStock = await this.prisma.itemStock.create({
      data: createItemStockInputBodyDto,
    });

    return createdItemStock;
  }

  async findAll(
    findAllItemStockInputQueryDto: FindAllItemStockInputQueryDto,
  ): Promise<FindAllItemStockOutputDto> {
    const { page, perPage, outputAmount, currentAmount, ...queryFilters } =
      findAllItemStockInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const outputAmountNumber = outputAmount ? Number(outputAmount) : undefined;
    const currentAmountNumber = currentAmount
      ? Number(currentAmount)
      : undefined;

    const [itemStock, totalItems] = await Promise.all([
      this.prisma.itemStock.findMany({
        where: {
          ...queryFilters,
          outputAmount: outputAmountNumber,
          currentAmount: currentAmountNumber,
          deletedAt: null,
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.itemStock.count({
        where: {
          ...queryFilters,
          outputAmount: outputAmountNumber,
          currentAmount: currentAmountNumber,
          deletedAt: null,
        },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const response: FindAllItemStockOutputDto = {
      data: itemStock,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemStockInputParamDto: FindOneItemStockInputParamDto,
  ): Promise<FindOneItemStockOutputDto> {
    const itemStock = await this.prisma.itemStock.findUnique({
      where: {
        id: findOneItemStockInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!itemStock) {
      throw new NotFoundException(`Item Stock not found`);
    }

    return itemStock;
  }

  async update(
    updateItemStockInputParamDto: UpdateItemStockInputParamDto,
    updateItemStockInputBodyDto: UpdateItemStockInputBodyDto,
  ): Promise<UpdateItemStockOutputDto> {
    const itemStock = await this.prisma.itemStock.findUnique({
      where: { id: updateItemStockInputParamDto.id, deletedAt: null },
    });

    if (!itemStock) {
      throw new NotFoundException(`Item Stock not found`);
    }

    const updatedItemStock = await this.prisma.itemStock.update({
      where: { id: updateItemStockInputParamDto.id, deletedAt: null },
      data: updateItemStockInputBodyDto,
    });

    return updatedItemStock;
  }
}
