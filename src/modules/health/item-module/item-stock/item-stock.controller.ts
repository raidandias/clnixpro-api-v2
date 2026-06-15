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

import { ItemStockService } from './item-stock.service';
import { CreateItemStockOutputDto } from './dto/output/create-item-stock-output.dto';
import { UpdateItemStockOutputDto } from './dto/output/update-item-stock-output.dto';
import { CreateItemStockInputBodyDto } from './dto/input/create-item-stock-input-body.dto';
import { FindAllItemStockOutputDto } from './dto/output/find-all-item-stock-output.dto';
import { FindAllItemStockInputQueryDto } from './dto/input/find-all-item-stock-input-query.dto';
import { FindOneItemStockOutputDto } from './dto/output/find-one-item-stock-output.dto';
import { FindOneItemStockInputParamDto } from './dto/input/find-one-item-stock-input-param.dto';
import {
  UpdateItemStockInputBodyDto,
  UpdateItemStockInputParamDto,
} from './dto/input/update-item-stock-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Product Stock')
@Controller('api/item-stock')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemStockController {
  constructor(private readonly itemStockService: ItemStockService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Item Product Stock' })
  @ApiResponse({
    status: 200,
    description: 'The ItemStock has been successfully created.',
    type: CreateItemStockOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createItemStockInputBodyDto: CreateItemStockInputBodyDto,
  ): Promise<CreateItemStockOutputDto> {
    return await this.itemStockService.create(createItemStockInputBodyDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemStockOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemStockInputQueryDto,
  ): Promise<FindAllItemStockOutputDto> {
    return await this.itemStockService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Item Product Stock with ID' })
  @ApiResponse({ status: 200, type: FindOneItemStockOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemStockInputParamDto,
  ): Promise<FindOneItemStockOutputDto> {
    return this.itemStockService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Item Product Stock with ID' })
  @ApiResponse({ status: 200, type: UpdateItemStockOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemStockInputParamDto: UpdateItemStockInputParamDto,
    @Body() updateItemStockInputBodyDto: UpdateItemStockInputBodyDto,
  ) {
    return this.itemStockService.update(
      updateItemStockInputParamDto,
      updateItemStockInputBodyDto,
    );
  }
}
