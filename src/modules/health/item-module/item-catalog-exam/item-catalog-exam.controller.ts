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

import { ItemCatalogExamService } from './item-catalog-exam.service';
import { CreateItemCatalogExamOutputDto } from './dto/output/create-item-catalog-exam-output.dto';
import { UpdateItemCatalogExamOutputDto } from './dto/output/update-item-catalog-exam-output.dto';
import { CreateItemCatalogExamInputBodyDto } from './dto/input/create-item-catalog-exam-input-body.dto';
import { FindAllItemCatalogExamOutputDto } from './dto/output/find-all-item-catalog-exam-output.dto';
import { FindAllItemCatalogExamInputQueryDto } from './dto/input/find-all-item-catalog-exam-input-query.dto';
import { FindOneItemCatalogExamOutputDto } from './dto/output/find-one-item-catalog-exam-output.dto';
import { FindOneItemCatalogExamInputParamDto } from './dto/input/find-one-item-catalog-exam-input-param.dto';
import {
  UpdateItemCatalogExamInputBodyDto,
  UpdateItemCatalogExamInputParamDto,
} from './dto/input/update-item-catalog-exam-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Catalog Exam')
@Controller('api/item-catalog-exam')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemCatalogExamController {
  constructor(
    private readonly itemCatalogExamService: ItemCatalogExamService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new ItemCatalogExam' })
  @ApiResponse({
    status: 200,
    description: 'The ItemCatalogExam has been successfully created.',
    type: CreateItemCatalogExamOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemCatalogExamInputBodyDto: CreateItemCatalogExamInputBodyDto,
  ): Promise<CreateItemCatalogExamOutputDto> {
    return await this.itemCatalogExamService.create(
      createItemCatalogExamInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemCatalogExamOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemCatalogExamInputQueryDto,
  ): Promise<FindAllItemCatalogExamOutputDto> {
    return await this.itemCatalogExamService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemCatalogExam with ID' })
  @ApiResponse({ status: 200, type: FindOneItemCatalogExamOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemCatalogExamInputParamDto,
  ): Promise<FindOneItemCatalogExamOutputDto> {
    return this.itemCatalogExamService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update ItemCatalogExam with ID' })
  @ApiResponse({ status: 200, type: UpdateItemCatalogExamOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemCatalogExamInputParamDto: UpdateItemCatalogExamInputParamDto,
    @Body()
    updateItemCatalogExamInputBodyDto: UpdateItemCatalogExamInputBodyDto,
  ) {
    return this.itemCatalogExamService.update(
      updateItemCatalogExamInputParamDto,
      updateItemCatalogExamInputBodyDto,
    );
  }
}
