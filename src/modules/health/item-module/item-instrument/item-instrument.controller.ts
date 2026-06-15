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

import { ItemInstrumentService } from './item-instrument.service';
import { CreateItemInstrumentOutputDto } from './dto/output/create-item-instrument-output.dto';
import { UpdateItemInstrumentOutputDto } from './dto/output/update-item-instrument-output.dto';
import { CreateItemInstrumentInputBodyArrayDto } from './dto/input/create-item-instrument-input-body.dto';
import { FindAllItemInstrumentOutputDto } from './dto/output/find-all-item-instrument-output.dto';
import { FindAllItemInstrumentInputQueryDto } from './dto/input/find-all-item-instrument-input-query.dto';
import { FindOneItemInstrumentOutputDto } from './dto/output/find-one-item-instrument-output.dto';
import { FindOneItemInstrumentInputParamDto } from './dto/input/find-one-item-instrument-input-param.dto';
import {
  UpdateItemInstrumentInputBodyDto,
  UpdateItemInstrumentInputParamDto,
} from './dto/input/update-item-instrument-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Service Instrument')
@Controller('api/item-instrument')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemInstrumentController {
  constructor(private readonly itemInstrumentService: ItemInstrumentService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new ItemInstrument' })
  @ApiResponse({
    status: 200,
    description: 'The ItemInstrument has been successfully created.',
    type: [CreateItemInstrumentOutputDto],
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemInstrumentInputBodyDto: CreateItemInstrumentInputBodyArrayDto,
  ): Promise<CreateItemInstrumentOutputDto[]> {
    return await this.itemInstrumentService.create(
      createItemInstrumentInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemInstrumentOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemInstrumentInputQueryDto,
  ): Promise<FindAllItemInstrumentOutputDto> {
    return await this.itemInstrumentService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemInstrument with ID' })
  @ApiResponse({ status: 200, type: FindOneItemInstrumentOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemInstrumentInputParamDto,
  ): Promise<FindOneItemInstrumentOutputDto> {
    return this.itemInstrumentService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Item Instrument with ID' })
  @ApiResponse({ status: 200, type: UpdateItemInstrumentOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemInstrumentInputParamDto: UpdateItemInstrumentInputParamDto,
    @Body() updateItemInstrumentInputBodyDto: UpdateItemInstrumentInputBodyDto,
  ) {
    return this.itemInstrumentService.update(
      updateItemInstrumentInputParamDto,
      updateItemInstrumentInputBodyDto,
    );
  }
}
