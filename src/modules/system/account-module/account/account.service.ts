import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateAccountInputBodyDto } from './dto/input/create-account-input-body.dto';
import { CreateAccountOutputDto } from './dto/output/create-account-output.dto';
import {
  UpdateAccountInputBodyDto,
  UpdateAccountInputParamDto,
} from './dto/input/update-account-input-param-hibrido.dto';
import { UpdateAccountOutputDto } from './dto/output/update-account-output.dto';
import { FindAllAccountOutputDto } from './dto/output/find-all-account-output.dto';
import { FindOneAccountInputParamDto } from './dto/input/find-one-account-input-param.dto';
import { FindOneAccountOutputDto } from './dto/output/find-one-account-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllAccountInputQueryDto } from './dto/input/find-all-account-input-query.dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAccountInputBodyDto: CreateAccountInputBodyDto,
  ): Promise<CreateAccountOutputDto> {
    const account = await this.prisma.account.create({
      data: createAccountInputBodyDto,
    });

    if (!account) {
      throw new NotFoundException(`Account not created`);
    }

    return account;
  }

  async findAll(
    findAllAccountInputQueryDto: FindAllAccountInputQueryDto,
  ): Promise<FindAllAccountOutputDto> {
    const { page, perPage, ...queryFilters } = findAllAccountInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [account, totalItems] = await Promise.all([
      this.prisma.account.findMany({
        where: queryFilters,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      this.prisma.account.count({ where: queryFilters }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const response: FindAllAccountOutputDto = {
      data: account,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneAccountInputParamDto: FindOneAccountInputParamDto,
  ): Promise<FindOneAccountOutputDto> {
    const account = await this.prisma.account.findUnique({
      where: {
        id: findOneAccountInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    return account;
  }

  async update(
    updateAccountInputParamDto: UpdateAccountInputParamDto,
    updateAccountInputBodyDto: UpdateAccountInputBodyDto,
  ): Promise<UpdateAccountOutputDto> {
    const account = await this.prisma.account.findUnique({
      where: { id: updateAccountInputParamDto.id, deletedAt: null },
    });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    const updatedAccount = await this.prisma.account.update({
      where: { id: updateAccountInputParamDto.id, deletedAt: null },
      data: updateAccountInputBodyDto,
    });

    return updatedAccount;
  }
}
