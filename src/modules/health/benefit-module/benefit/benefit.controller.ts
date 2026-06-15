import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BenefitService } from './benefit.service';
import { CreateBenefitInputBodyDto } from './dto/input/create-benefit-input-body.dto';
import { CreateBenefitOutputDto } from './dto/output/create-benefit-output.dto';
import { FindAllBenefitInputQueryDto } from './dto/input/find-all-benefit-input-query.dto';
import { FindAllBenefitOutputDto } from './dto/output/find-all-benefit-output.dto';
import { FindOneBenefitInputParamDto } from './dto/input/find-one-benefit-input-param.dto';
import { FindOneBenefitOutputDto } from './dto/output/find-one-benefit-output.dto';
import { UpdateBenefitInputBodyDto, UpdateBenefitInputParamDto } from './dto/input/update-benefit-input-param-hibrido.dto';
import { UpdateBenefitOutputDto } from './dto/output/update-benefit-output.dto';
import { DeleteBenefitInputParamDto } from './dto/input/delete-benefit-input-param.dto';
import { DeleteBenefitOutputDto } from './dto/output/delete-benefit-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Benefit')
@Controller('api/benefit')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Benefit' })
  @ApiResponse({ status: 200, description: 'The Benefit has been successfully created.', type: CreateBenefitOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateBenefitInputBodyDto): Promise<CreateBenefitOutputDto> {
    return this.benefitService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Benefits' })
  @ApiResponse({ status: 200, type: FindAllBenefitOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllBenefitInputQueryDto): Promise<FindAllBenefitOutputDto> {
    return this.benefitService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Benefit by ID' })
  @ApiResponse({ status: 200, type: FindOneBenefitOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneBenefitInputParamDto): Promise<FindOneBenefitOutputDto> {
    return this.benefitService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Benefit by ID' })
  @ApiResponse({ status: 200, type: UpdateBenefitOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateBenefitInputParamDto, @Body() body: UpdateBenefitInputBodyDto): Promise<UpdateBenefitOutputDto> {
    return this.benefitService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Benefit by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteBenefitOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteBenefitInputParamDto): Promise<DeleteBenefitOutputDto> {
    return this.benefitService.delete(param);
  }
}
