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

import { ItemService } from './item.service';
import { CreateItemOutputDto } from './dto/output/create-item-output.dto';
import { UpdateItemOutputDto } from './dto/output/update-item-output.dto';
import { CreateItemInputBodyDto } from './dto/input/create-item-input-body.dto';
import { FindAllItemOutputDto } from './dto/output/find-all-item-output.dto';
import { FindAllItemInputQueryDto } from './dto/input/find-all-item-input-query.dto';
import { FindOneItemOutputDto } from './dto/output/find-one-item-output.dto';
import { FindOneItemInputParamDto } from './dto/input/find-one-item-input-param.dto';
import {
  UpdateItemInputBodyDto,
  UpdateItemInputParamDto,
} from './dto/input/update-item-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item')
@Controller('api/health/item')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Item' })
  @ApiResponse({
    status: 200,
    description: 'The Item has been successfully created.',
    type: CreateItemOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createItemInputBodyDto: CreateItemInputBodyDto,
  ): Promise<CreateItemOutputDto> {
    return await this.itemService.create(createItemInputBodyDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemInputQueryDto,
  ): Promise<FindAllItemOutputDto> {
    return await this.itemService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Item with ID' })
  @ApiResponse({ status: 200, type: FindOneItemOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemInputParamDto,
  ): Promise<FindOneItemOutputDto> {
    return this.itemService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Item with ID' })
  @ApiResponse({ status: 200, type: UpdateItemOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemInputParamDto: UpdateItemInputParamDto,
    @Body() updateItemInputBodyDto: UpdateItemInputBodyDto,
  ) {
    return this.itemService.update(
      updateItemInputParamDto,
      updateItemInputBodyDto,
    );
  }
}
