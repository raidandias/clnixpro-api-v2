import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BenefitPatientService } from './benefit-patient.service';
import { CreateBenefitPatientInputBodyDto } from './dto/input/create-benefit-patient-input-body.dto';
import { CreateBenefitPatientOutputDto } from './dto/output/create-benefit-patient-output.dto';
import { FindAllBenefitPatientInputQueryDto } from './dto/input/find-all-benefit-patient-input-query.dto';
import { FindAllBenefitPatientOutputDto } from './dto/output/find-all-benefit-patient-output.dto';
import { FindOneBenefitPatientInputParamDto } from './dto/input/find-one-benefit-patient-input-param.dto';
import { FindOneBenefitPatientOutputDto } from './dto/output/find-one-benefit-patient-output.dto';
import { UpdateBenefitPatientInputBodyDto, UpdateBenefitPatientInputParamDto } from './dto/input/update-benefit-patient-input-param-hibrido.dto';
import { UpdateBenefitPatientOutputDto } from './dto/output/update-benefit-patient-output.dto';
import { DeleteBenefitPatientInputParamDto } from './dto/input/delete-benefit-patient-input-param.dto';
import { DeleteBenefitPatientOutputDto } from './dto/output/delete-benefit-patient-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Benefit Patient')
@Controller('api/benefit-patient')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class BenefitPatientController {
  constructor(private readonly benefitPatientService: BenefitPatientService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Benefit Patient' })
  @ApiResponse({ status: 200, description: 'The Benefit Patient has been successfully created.', type: CreateBenefitPatientOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateBenefitPatientInputBodyDto): Promise<CreateBenefitPatientOutputDto> {
    return this.benefitPatientService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Benefit Patients' })
  @ApiResponse({ status: 200, type: FindAllBenefitPatientOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllBenefitPatientInputQueryDto): Promise<FindAllBenefitPatientOutputDto> {
    return this.benefitPatientService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Benefit Patient by ID' })
  @ApiResponse({ status: 200, type: FindOneBenefitPatientOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneBenefitPatientInputParamDto): Promise<FindOneBenefitPatientOutputDto> {
    return this.benefitPatientService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Benefit Patient by ID' })
  @ApiResponse({ status: 200, type: UpdateBenefitPatientOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateBenefitPatientInputParamDto, @Body() body: UpdateBenefitPatientInputBodyDto): Promise<UpdateBenefitPatientOutputDto> {
    return this.benefitPatientService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Benefit Patient by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteBenefitPatientOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteBenefitPatientInputParamDto): Promise<DeleteBenefitPatientOutputDto> {
    return this.benefitPatientService.delete(param);
  }
}
