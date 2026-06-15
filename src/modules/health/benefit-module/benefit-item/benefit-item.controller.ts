import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BenefitItemService } from './benefit-item.service';
import { CreateBenefitItemInputBodyDto } from './dto/input/create-benefit-item-input-body.dto';
import { CreateBenefitItemOutputDto } from './dto/output/create-benefit-item-output.dto';
import { FindAllBenefitItemInputQueryDto } from './dto/input/find-all-benefit-item-input-query.dto';
import { FindAllBenefitItemOutputDto } from './dto/output/find-all-benefit-item-output.dto';
import { FindOneBenefitItemInputParamDto } from './dto/input/find-one-benefit-item-input-param.dto';
import { FindOneBenefitItemOutputDto } from './dto/output/find-one-benefit-item-output.dto';
import { UpdateBenefitItemInputBodyDto, UpdateBenefitItemInputParamDto } from './dto/input/update-benefit-item-input-param-hibrido.dto';
import { UpdateBenefitItemOutputDto } from './dto/output/update-benefit-item-output.dto';
import { DeleteBenefitItemInputParamDto } from './dto/input/delete-benefit-item-input-param.dto';
import { DeleteBenefitItemOutputDto } from './dto/output/delete-benefit-item-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Benefit Item')
@Controller('api/benefit-item')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class BenefitItemController {
  constructor(private readonly benefitItemService: BenefitItemService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Benefit Item' })
  @ApiResponse({ status: 200, description: 'The Benefit Item has been successfully created.', type: CreateBenefitItemOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateBenefitItemInputBodyDto): Promise<CreateBenefitItemOutputDto> {
    return this.benefitItemService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Benefit Items' })
  @ApiResponse({ status: 200, type: FindAllBenefitItemOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllBenefitItemInputQueryDto): Promise<FindAllBenefitItemOutputDto> {
    return this.benefitItemService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Benefit Item by ID' })
  @ApiResponse({ status: 200, type: FindOneBenefitItemOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneBenefitItemInputParamDto): Promise<FindOneBenefitItemOutputDto> {
    return this.benefitItemService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Benefit Item by ID' })
  @ApiResponse({ status: 200, type: UpdateBenefitItemOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateBenefitItemInputParamDto, @Body() body: UpdateBenefitItemInputBodyDto): Promise<UpdateBenefitItemOutputDto> {
    return this.benefitItemService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Benefit Item by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteBenefitItemOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteBenefitItemInputParamDto): Promise<DeleteBenefitItemOutputDto> {
    return this.benefitItemService.delete(param);
  }
}
