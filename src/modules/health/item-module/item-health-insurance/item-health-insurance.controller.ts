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

import { ItemHealthInsuranceService } from './item-health-insurance.service';
import { CreateItemHealthInsuranceOutputDto } from './dto/output/create-item-health-insurance-output.dto';
import { UpdateItemHealthInsuranceOutputDto } from './dto/output/update-item-health-insurance-output.dto';
import {
  CreateItemHealthInsuranceInputBodyArrayDto,
  CreateItemHealthInsuranceInputBodyDto,
} from './dto/input/create-item-health-insurance-input-body.dto';
import { FindAllItemHealthInsuranceOutputDto } from './dto/output/find-all-item-health-insurance-output.dto';
import { FindAllItemHealthInsuranceInputQueryDto } from './dto/input/find-all-item-health-insurance-input-query.dto';
import { FindOneItemHealthInsuranceOutputDto } from './dto/output/find-one-item-health-insurance-output.dto';
import { FindOneItemHealthInsuranceInputParamDto } from './dto/input/find-one-item-health-insurance-input-param.dto';
import {
  UpdateItemHealthInsuranceInputBodyDto,
  UpdateItemHealthInsuranceInputParamDto,
} from './dto/input/update-item-health-insurance-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Item Health Insurance')
@Controller('api/item-health-insurance')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ItemHealthInsuranceController {
  constructor(
    private readonly itemHealthInsuranceService: ItemHealthInsuranceService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Item Health Insurance' })
  @ApiResponse({
    status: 200,
    description: 'The Item Health Insurance has been successfully created.',
    type: [CreateItemHealthInsuranceOutputDto],
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createItemHealthInsuranceInputBodyDto: CreateItemHealthInsuranceInputBodyArrayDto,
  ): Promise<CreateItemHealthInsuranceOutputDto[]> {
    return await this.itemHealthInsuranceService.create(
      createItemHealthInsuranceInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllItemHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllItemHealthInsuranceInputQueryDto,
  ): Promise<FindAllItemHealthInsuranceOutputDto> {
    return await this.itemHealthInsuranceService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get ItemHealthInsurance with ID' })
  @ApiResponse({ status: 200, type: FindOneItemHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneItemHealthInsuranceInputParamDto,
  ): Promise<FindOneItemHealthInsuranceOutputDto> {
    return this.itemHealthInsuranceService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update ItemHealthInsurance with ID' })
  @ApiResponse({ status: 200, type: UpdateItemHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateItemHealthInsuranceInputParamDto: UpdateItemHealthInsuranceInputParamDto,
    @Body()
    updateItemHealthInsuranceInputBodyDto: UpdateItemHealthInsuranceInputBodyDto,
  ) {
    return this.itemHealthInsuranceService.update(
      updateItemHealthInsuranceInputParamDto,
      updateItemHealthInsuranceInputBodyDto,
    );
  }
}
