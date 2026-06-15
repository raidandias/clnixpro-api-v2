import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateSupplierInputBodyDto } from './dto/input/create-supplier-input-body.dto';
import { CreateSupplierOutputDto } from './dto/output/create-supplier-output.dto';
import { FindAllSupplierInputQueryDto } from './dto/input/find-all-supplier-input-query.dto';
import { FindAllSupplierOutputDto } from './dto/output/find-all-supplier-output.dto';
import { FindOneSupplierInputParamDto } from './dto/input/find-one-supplier-input-param.dto';
import { FindOneSupplierOutputDto } from './dto/output/find-one-supplier-output.dto';
import { UpdateSupplierInputBodyDto, UpdateSupplierInputParamDto } from './dto/input/update-supplier-input-param-hibrido.dto';
import { UpdateSupplierOutputDto } from './dto/output/update-supplier-output.dto';
import { DeleteSupplierInputParamDto } from './dto/input/delete-supplier-input-param.dto';
import { DeleteSupplierOutputDto } from './dto/output/delete-supplier-output.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSupplierInputBodyDto): Promise<CreateSupplierOutputDto> {
    return this.prisma.supplier.create({ data: dto as any });
  }

  async findAll(query: FindAllSupplierInputQueryDto): Promise<FindAllSupplierOutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.supplier.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.supplier.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOneSupplierInputParamDto): Promise<FindOneSupplierOutputDto> {
    const item = await this.prisma.supplier.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Supplier not found');
    return item;
  }

  async update(param: UpdateSupplierInputParamDto, body: UpdateSupplierInputBodyDto): Promise<UpdateSupplierOutputDto> {
    const item = await this.prisma.supplier.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Supplier not found');
    return this.prisma.supplier.update({ where: { id: param.id }, data: body });
  }

  async delete(param: DeleteSupplierInputParamDto): Promise<DeleteSupplierOutputDto> {
    const item = await this.prisma.supplier.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('Supplier not found');
    return this.prisma.supplier.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
