import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ValidationPipe,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ItemCatalogProductService } from './item-catalog-product.service';
import { CreateItemCatalogProductOutputDto } from './dto/output/create-item-catalog-product-output.dto';
import { UpdateItemCatalogProductOutputDto } from './dto/output/update-item-catalog-product-output.dto';
import { CreateItemCatalogProductInputBodyDto } from './dto/input/create-item-catalog-product-input-body.dto';
import { FindAllItemCatalogProductOutputDto } from './dto/output/find-all-item-catalog-product-output.dto';
import { FindAllItemCatalogProductInputQueryDto } from './dto/input/find-all-item-catalog-product-input-query.dto';
import { FindOneItemCatalogProductOutputDto } from './dto/output/find-one-item-catalog-product-output.dto';
import { FindOneItemCatalogProductInputParamDto } from './dto/input/find-one-item-catalog-product-input-param.dto';
import {
  UpdateItemCatalogProductInputBodyDto,
  UpdateItemCatalogProductInputParamDto,
} from './dto/input/update-item-catalog-product-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Catalog Product')
@Controller('api/item-catalog-product')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemCatalogProductController {
  constructor(
    private readonly itemCatalogProductService: ItemCatalogProductService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new ItemCatalogProduct' })
  @ApiResponse({
    status: 200,
    description: 'The ItemCatalogProduct has been successfully created.',
    type: CreateItemCatalogProductOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemCatalogProductInputBodyDto: CreateItemCatalogProductInputBodyDto,
  ): Promise<CreateItemCatalogProductOutputDto> {
    return await this.itemCatalogProductService.create(
      createItemCatalogProductInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemCatalogProductOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemCatalogProductInputQueryDto,
  ): Promise<FindAllItemCatalogProductOutputDto> {
    return await this.itemCatalogProductService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemCatalogProduct with ID' })
  @ApiResponse({ status: 200, type: FindOneItemCatalogProductOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemCatalogProductInputParamDto,
  ): Promise<FindOneItemCatalogProductOutputDto> {
    return this.itemCatalogProductService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update ItemCatalogProduct with ID' })
  @ApiResponse({ status: 200, type: UpdateItemCatalogProductOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemCatalogProductInputParamDto: UpdateItemCatalogProductInputParamDto,
    @Body()
    updateItemCatalogProductInputBodyDto: UpdateItemCatalogProductInputBodyDto,
  ) {
    return this.itemCatalogProductService.update(
      updateItemCatalogProductInputParamDto,
      updateItemCatalogProductInputBodyDto,
    );
  }
}
