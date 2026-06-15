import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ValidationPipe,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthMedicalCareFileService } from './health-medical-care-file.service';
import { CreateHealthMedicalCareFileInputBodyDto } from './dto/input/create-health-medical-care-file-input-body.dto';
import { CreateHealthMedicalCareFileOutputDto } from './dto/output/create-health-medical-care-file-output.dto';
import { FindAllHealthMedicalCareFileInputQueryDto } from './dto/input/find-all-health-medical-care-file-input-query.dto';
import { FindAllHealthMedicalCareFileOutputDto } from './dto/output/find-all-health-medical-care-file-output.dto';
import { FindOneHealthMedicalCareFileInputParamDto } from './dto/input/find-one-health-medical-care-file-input-param.dto';
import { FindOneHealthMedicalCareFileOutputDto } from './dto/output/find-one-health-medical-care-file-output.dto';
import {
  UpdateHealthMedicalCareFileInputBodyDto,
  UpdateHealthMedicalCareFileInputParamDto,
} from './dto/input/update-health-medical-care-file-input-param-hibrido.dto';
import { UpdateHealthMedicalCareFileOutputDto } from './dto/output/update-health-medical-care-file-output.dto';
import { DeleteHealthMedicalCareFileInputParamDto } from './dto/input/delete-health-medical-care-file-input-param.dto';
import { DeleteHealthMedicalCareFileOutputDto } from './dto/output/delete-health-medical-care-file-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Health Medical Care File')
@Controller('api/health-medical-care-file')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class HealthMedicalCareFileController {
  constructor(private readonly healthMedicalCareFileService: HealthMedicalCareFileService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Health Medical Care File record' })
  @ApiResponse({
    status: 200,
    description: 'The Health Medical Care File record has been successfully created.',
    type: CreateHealthMedicalCareFileOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() dto: CreateHealthMedicalCareFileInputBodyDto,
  ): Promise<CreateHealthMedicalCareFileOutputDto> {
    return this.healthMedicalCareFileService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Health Medical Care File records' })
  @ApiResponse({ status: 200, type: FindAllHealthMedicalCareFileOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllHealthMedicalCareFileInputQueryDto,
  ): Promise<FindAllHealthMedicalCareFileOutputDto> {
    return this.healthMedicalCareFileService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Health Medical Care File record by ID' })
  @ApiResponse({ status: 200, type: FindOneHealthMedicalCareFileOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneHealthMedicalCareFileInputParamDto,
  ): Promise<FindOneHealthMedicalCareFileOutputDto> {
    return this.healthMedicalCareFileService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Health Medical Care File record by ID' })
  @ApiResponse({ status: 200, type: UpdateHealthMedicalCareFileOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    param: UpdateHealthMedicalCareFileInputParamDto,
    @Body() body: UpdateHealthMedicalCareFileInputBodyDto,
  ): Promise<UpdateHealthMedicalCareFileOutputDto> {
    return this.healthMedicalCareFileService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Health Medical Care File record by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteHealthMedicalCareFileOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true }))
    param: DeleteHealthMedicalCareFileInputParamDto,
  ): Promise<DeleteHealthMedicalCareFileOutputDto> {
    return this.healthMedicalCareFileService.delete(param);
  }
}
