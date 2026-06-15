import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
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
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Supplier')
@Controller('api/supplier')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Supplier' })
  @ApiResponse({ status: 200, description: 'The Supplier has been successfully created.', type: CreateSupplierOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateSupplierInputBodyDto): Promise<CreateSupplierOutputDto> {
    return this.supplierService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Suppliers' })
  @ApiResponse({ status: 200, type: FindAllSupplierOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllSupplierInputQueryDto): Promise<FindAllSupplierOutputDto> {
    return this.supplierService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Supplier by ID' })
  @ApiResponse({ status: 200, type: FindOneSupplierOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneSupplierInputParamDto): Promise<FindOneSupplierOutputDto> {
    return this.supplierService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Supplier by ID' })
  @ApiResponse({ status: 200, type: UpdateSupplierOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateSupplierInputParamDto, @Body() body: UpdateSupplierInputBodyDto): Promise<UpdateSupplierOutputDto> {
    return this.supplierService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Supplier by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteSupplierOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteSupplierInputParamDto): Promise<DeleteSupplierOutputDto> {
    return this.supplierService.delete(param);
  }
}
