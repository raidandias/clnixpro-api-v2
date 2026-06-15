import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateCustomerInputBodyDto } from './dto/input/create-customer-input-body.dto';
import { CreateCustomerOutputDto } from './dto/output/create-customer-output.dto';
import { FindAllCustomerInputQueryDto } from './dto/input/find-all-customer-input-query.dto';
import { FindAllCustomerOutputDto } from './dto/output/find-all-customer-output.dto';
import { FindOneCustomerInputParamDto } from './dto/input/find-one-customer-input-param.dto';
import { FindOneCustomerOutputDto } from './dto/output/find-one-customer-output.dto';
import { UpdateCustomerInputBodyDto, UpdateCustomerInputParamDto } from './dto/input/update-customer-input-param-hibrido.dto';
import { UpdateCustomerOutputDto } from './dto/output/update-customer-output.dto';
import { DeleteCustomerInputParamDto } from './dto/input/delete-customer-input-param.dto';
import { DeleteCustomerOutputDto } from './dto/output/delete-customer-output.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerInputBodyDto): Promise<CreateCustomerOutputDto> {
    return this.prisma.customer.create({ data: dto as any });
  }

  async findAll(query: FindAllCustomerInputQueryDto): Promise<FindAllCustomerOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.customer.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.customer.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneCustomerInputParamDto): Promise<FindOneCustomerOutputDto> {
    const item = await this.prisma.customer.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Customer not found');
    return item;
  }

  async update(param: UpdateCustomerInputParamDto, body: UpdateCustomerInputBodyDto): Promise<UpdateCustomerOutputDto> {
    const item = await this.prisma.customer.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Customer not found');
    return this.prisma.customer.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteCustomerInputParamDto): Promise<DeleteCustomerOutputDto> {
    const item = await this.prisma.customer.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Customer not found');
    return this.prisma.customer.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
