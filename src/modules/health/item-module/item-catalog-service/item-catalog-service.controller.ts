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

import { ItemCatalogServiceService } from './item-catalog-service.service';
import { CreateItemCatalogServiceOutputDto } from './dto/output/create-item-catalog-service-output.dto';
import { UpdateItemCatalogServiceOutputDto } from './dto/output/update-item-catalog-service-output.dto';
import { CreateItemCatalogServiceInputBodyDto } from './dto/input/create-item-catalog-service-input-body.dto';
import { FindAllItemCatalogServiceOutputDto } from './dto/output/find-all-item-catalog-service-output.dto';
import { FindAllItemCatalogServiceInputQueryDto } from './dto/input/find-all-item-catalog-service-input-query.dto';
import { FindOneItemCatalogServiceOutputDto } from './dto/output/find-one-item-catalog-service-output.dto';
import { FindOneItemCatalogServiceInputParamDto } from './dto/input/find-one-item-catalog-service-input-param.dto';
import {
  UpdateItemCatalogServiceInputBodyDto,
  UpdateItemCatalogServiceInputParamDto,
} from './dto/input/update-item-catalog-service-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Catalog Service')
@Controller('api/item-catalog-service')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemCatalogServiceController {
  constructor(
    private readonly itemCatalogServiceService: ItemCatalogServiceService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new ItemCatalogService' })
  @ApiResponse({
    status: 200,
    description: 'The ItemCatalogService has been successfully created.',
    type: CreateItemCatalogServiceOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemCatalogServiceInputBodyDto: CreateItemCatalogServiceInputBodyDto,
  ): Promise<CreateItemCatalogServiceOutputDto> {
    return await this.itemCatalogServiceService.create(
      createItemCatalogServiceInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemCatalogServiceOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemCatalogServiceInputQueryDto,
  ): Promise<FindAllItemCatalogServiceOutputDto> {
    return await this.itemCatalogServiceService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemCatalogService with ID' })
  @ApiResponse({ status: 200, type: FindOneItemCatalogServiceOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemCatalogServiceInputParamDto,
  ): Promise<FindOneItemCatalogServiceOutputDto> {
    return this.itemCatalogServiceService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update ItemCatalogService with ID' })
  @ApiResponse({ status: 200, type: UpdateItemCatalogServiceOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemCatalogServiceInputParamDto: UpdateItemCatalogServiceInputParamDto,
    @Body()
    updateItemCatalogServiceInputBodyDto: UpdateItemCatalogServiceInputBodyDto,
  ) {
    return this.itemCatalogServiceService.update(
      updateItemCatalogServiceInputParamDto,
      updateItemCatalogServiceInputBodyDto,
    );
  }
}
