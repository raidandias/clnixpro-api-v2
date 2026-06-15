import {
  Controller,
  Get,
  Post,
  Body,
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

import { PatientService } from './patient.service';
import { CreatePatientOutputDto } from './dto/output/create-patient-output.dto';
import { CreatePatientInputBodyDto } from './dto/input/create-patient-input-body.dto';
import { FindAllPatientOutputDto } from './dto/output/find-all-patient-output.dto';
import { FindAllPatientInputQueryDto } from './dto/input/find-all-patient-input-query.dto';
import { FindOnePatientOutputDto } from './dto/output/find-one-patient-output.dto';
import { FindOnePatientInputParamDto } from './dto/input/find-one-patient-input-param.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Patient')
@Controller('api/patient')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Patient' })
  @ApiResponse({
    status: 200,
    description: 'The Patient has been successfully created.',
    type: CreatePatientOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createPatientInputBodyDto: CreatePatientInputBodyDto,
  ): Promise<CreatePatientOutputDto> {
    return await this.patientService.create(createPatientInputBodyDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllPatientOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllPatientInputQueryDto,
  ): Promise<FindAllPatientOutputDto> {
    return await this.patientService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Patient with ID' })
  @ApiResponse({ status: 200, type: FindOnePatientOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOnePatientInputParamDto,
  ): Promise<FindOnePatientOutputDto> {
    return this.patientService.findOne({ id: param.id });
  }
}
