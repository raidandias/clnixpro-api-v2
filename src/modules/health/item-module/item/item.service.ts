import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateItemInputBodyDto } from './dto/input/create-item-input-body.dto';
import { CreateItemOutputDto } from './dto/output/create-item-output.dto';
import {
  UpdateItemInputBodyDto,
  UpdateItemInputParamDto,
} from './dto/input/update-item-input-param-hibrido.dto';
import { UpdateItemOutputDto } from './dto/output/update-item-output.dto';
import { FindAllItemOutputDto } from './dto/output/find-all-item-output.dto';
import { FindOneItemInputParamDto } from './dto/input/find-one-item-input-param.dto';
import { FindOneItemOutputDto } from './dto/output/find-one-item-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllItemInputQueryDto } from './dto/input/find-all-item-input-query.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    createItemInputBodyDto: CreateItemInputBodyDto,
  ): Promise<CreateItemOutputDto> {
    const { supplierId, accountId, ...itemQuery } = createItemInputBodyDto;

    const item = await this.prisma.item.create({
      data: {
        ...itemQuery,
        accountId: accountId,
      },
    });

    return item;
  }

  async findAll(
    findAllItemInputQueryDto: FindAllItemInputQueryDto,
  ): Promise<FindAllItemOutputDto> {
    const { page, perPage, ...queryFilters } = findAllItemInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [item, totalItems] = await Promise.all([
      this.prisma.item.findMany({
        where: queryFilters,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: { itemCatalogs: true },
      }),
      this.prisma.item.count({
        where: queryFilters,
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const response: FindAllItemOutputDto = {
      data: item,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneItemInputParamDto: FindOneItemInputParamDto,
  ): Promise<FindOneItemOutputDto> {
    const item = await this.prisma.item.findUnique({
      where: {
        id: findOneItemInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    return item;
  }

  async update(
    updateItemInputParamDto: UpdateItemInputParamDto,
    updateItemInputBodyDto: UpdateItemInputBodyDto,
  ): Promise<UpdateItemOutputDto> {
    const { supplierId, accountId, ...itemQuery } = updateItemInputBodyDto;

    const item = await this.prisma.item.findUnique({
      where: {
        id: updateItemInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    const updatedItem = await this.prisma.item.update({
      where: {
        id: updateItemInputParamDto.id,
        deletedAt: null,
      },
      data: {
        accountId: accountId || undefined,
        description: itemQuery.description || undefined,
        name: itemQuery.name || undefined,
      },
    });

    return updatedItem;
  }
}
