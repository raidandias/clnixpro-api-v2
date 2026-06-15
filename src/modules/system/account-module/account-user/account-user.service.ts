import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateAccountUserInputBodyDto } from './dto/input/create-account-user-input-body.dto';
import { CreateAccountUserOutputDto } from './dto/output/create-account-user-output.dto';
import {
  UpdateAccountUserInputBodyDto,
  UpdateAccountUserInputParamDto,
} from './dto/input/update-account-user-input-param-hibrido.dto';
import { UpdateAccountUserOutputDto } from './dto/output/update-account-user-output.dto';
import { FindAllAccountUserOutputDto } from './dto/output/find-all-account-user-output.dto';
import { FindOneAccountUserInputParamDto } from './dto/input/find-one-account-user-input-param.dto';
import { FindOneAccountUserOutputDto } from './dto/output/find-one-account-user-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllAccountUserInputQueryDto } from './dto/input/find-all-account-user-input-query.dto';
import { AccountService } from '../account/account.service';
import { UsersService } from '../../user-module/users.service';

@Injectable()
export class AccountUserService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService,
    private usersService: UsersService,
  ) {}

  async create(
    createAccountUserInputBodyDto: CreateAccountUserInputBodyDto,
  ): Promise<CreateAccountUserOutputDto> {
    const account = await this.accountService.findOne({
      id: createAccountUserInputBodyDto.accountId,
    });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    const user = await this.usersService.findOne({
      id: createAccountUserInputBodyDto.userId,
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const accountUserExists = await this.prisma.accountUser.findFirst({
      where: {
        userId: createAccountUserInputBodyDto.userId,
        accountId: createAccountUserInputBodyDto.accountId,
        deletedAt: null,
      },
    });

    if (accountUserExists) {
      throw new NotFoundException(`User already associated with account`);
    }

    const accountUser = await this.prisma.accountUser.create({
      data: createAccountUserInputBodyDto,
    });

    if (!accountUser) {
      throw new NotFoundException(`Account User not create`);
    }

    return accountUser;
  }

  async findAll(
    findAllAccountUserInputQueryDto: FindAllAccountUserInputQueryDto,
  ): Promise<FindAllAccountUserOutputDto> {
    const { page, perPage, ...queryFilters } = findAllAccountUserInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const [accountUser, totalItems] = await Promise.all([
      this.prisma.accountUser.findMany({
        where: queryFilters,
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          account: { select: { id: true, name: true } },
        },
      }),
      this.prisma.accountUser.count({ where: queryFilters }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const response: FindAllAccountUserOutputDto = {
      data: accountUser,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneAccountUserInputParamDto: FindOneAccountUserInputParamDto,
  ): Promise<FindOneAccountUserOutputDto> {
    const accountUser = await this.prisma.accountUser.findUnique({
      where: {
        id: findOneAccountUserInputParamDto.id,
        deletedAt: null,
      },
      include: {
        account: { select: { id: true, name: true } },
      },
    });

    if (!accountUser) {
      throw new NotFoundException(`Account User not found`);
    }

    return accountUser;
  }

  async findOneAccount(
    findAllAccountUserInputQueryDto: FindAllAccountUserInputQueryDto,
  ): Promise<FindOneAccountUserOutputDto> {
    const accountUser = await this.prisma.accountUser.findFirst({
      where: {
        ...findAllAccountUserInputQueryDto,
        deletedAt: null,
      },
      take: 1,
      include: {
        account: { select: { id: true, name: true } },
      },
    });

    if (!accountUser) {
      throw new NotFoundException(`Account User not found`);
    }

    return accountUser;
  }

  async update(
    updateAccountUserInputParamDto: UpdateAccountUserInputParamDto,
    updateAccountUserInputBodyDto: UpdateAccountUserInputBodyDto,
  ): Promise<UpdateAccountUserOutputDto> {
    const accountUser = await this.prisma.accountUser.findUnique({
      where: { id: updateAccountUserInputParamDto.id, deletedAt: null },
    });

    if (!accountUser) {
      throw new NotFoundException(`Account User not found`);
    }

    const updatedAccountUser = await this.prisma.accountUser.update({
      where: { id: updateAccountUserInputParamDto.id, deletedAt: null },
      data: updateAccountUserInputBodyDto,
      include: { account: { select: { id: true, name: true } } },
    });

    return updatedAccountUser;
  }
}
