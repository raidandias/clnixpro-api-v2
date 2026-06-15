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

import { ItemExamService } from './item-exam.service';
import { CreateItemExamOutputDto } from './dto/output/create-item-exam-output.dto';
import { UpdateItemExamOutputDto } from './dto/output/update-item-exam-output.dto';
import { CreateItemExamInputBodyArrayDto } from './dto/input/create-item-exam-input-body.dto';
import { FindAllItemExamOutputDto } from './dto/output/find-all-item-exam-output.dto';
import { FindAllItemExamInputQueryDto } from './dto/input/find-all-item-exam-input-query.dto';
import { FindOneItemExamOutputDto } from './dto/output/find-one-item-exam-output.dto';
import { FindOneItemExamInputParamDto } from './dto/input/find-one-item-exam-input-param.dto';
import {
  UpdateItemExamInputBodyDto,
  UpdateItemExamInputParamDto,
} from './dto/input/update-item-exam-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Service Exam')
@Controller('api/item-exam')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemExamController {
  constructor(private readonly itemExamService: ItemExamService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new ItemExam' })
  @ApiResponse({
    status: 200,
    description: 'The ItemExam has been successfully created.',
    type: [CreateItemExamOutputDto],
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemExamInputBodyDto: CreateItemExamInputBodyArrayDto,
  ): Promise<CreateItemExamOutputDto[]> {
    return await this.itemExamService.create(createItemExamInputBodyDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemExamOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemExamInputQueryDto,
  ): Promise<FindAllItemExamOutputDto> {
    return await this.itemExamService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemExam with ID' })
  @ApiResponse({ status: 200, type: FindOneItemExamOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemExamInputParamDto,
  ): Promise<FindOneItemExamOutputDto> {
    return this.itemExamService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Item Exam with ID' })
  @ApiResponse({ status: 200, type: UpdateItemExamOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemExamInputParamDto: UpdateItemExamInputParamDto,
    @Body() updateItemExamInputBodyDto: UpdateItemExamInputBodyDto,
  ) {
    return this.itemExamService.update(
      updateItemExamInputParamDto,
      updateItemExamInputBodyDto,
    );
  }
}
