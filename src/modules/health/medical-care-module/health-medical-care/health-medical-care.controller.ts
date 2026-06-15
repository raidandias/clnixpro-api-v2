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

import { HealthMedicalCareService } from './health-medical-care.service';
import { CreateHealthMedicalCareInputBodyDto } from './dto/input/create-health-medical-care-input-body.dto';
import { CreateHealthMedicalCareOutputDto } from './dto/output/create-health-medical-care-output.dto';
import { FindAllHealthMedicalCareInputQueryDto } from './dto/input/find-all-health-medical-care-input-query.dto';
import { FindAllHealthMedicalCareOutputDto } from './dto/output/find-all-health-medical-care-output.dto';
import { FindOneHealthMedicalCareInputParamDto } from './dto/input/find-one-health-medical-care-input-param.dto';
import { FindOneHealthMedicalCareOutputDto } from './dto/output/find-one-health-medical-care-output.dto';
import {
  UpdateHealthMedicalCareInputBodyDto,
  UpdateHealthMedicalCareInputParamDto,
} from './dto/input/update-health-medical-care-input-param-hibrido.dto';
import { UpdateHealthMedicalCareOutputDto } from './dto/output/update-health-medical-care-output.dto';
import { DeleteHealthMedicalCareInputParamDto } from './dto/input/delete-health-medical-care-input-param.dto';
import { DeleteHealthMedicalCareOutputDto } from './dto/output/delete-health-medical-care-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Health Medical Care')
@Controller('api/health-medical-care')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class HealthMedicalCareController {
  constructor(private readonly healthMedicalCareService: HealthMedicalCareService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Health Medical Care record' })
  @ApiResponse({
    status: 200,
    description: 'The Health Medical Care record has been successfully created.',
    type: CreateHealthMedicalCareOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() dto: CreateHealthMedicalCareInputBodyDto,
  ): Promise<CreateHealthMedicalCareOutputDto> {
    return this.healthMedicalCareService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Health Medical Care records' })
  @ApiResponse({ status: 200, type: FindAllHealthMedicalCareOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllHealthMedicalCareInputQueryDto,
  ): Promise<FindAllHealthMedicalCareOutputDto> {
    return this.healthMedicalCareService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Health Medical Care record by ID' })
  @ApiResponse({ status: 200, type: FindOneHealthMedicalCareOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneHealthMedicalCareInputParamDto,
  ): Promise<FindOneHealthMedicalCareOutputDto> {
    return this.healthMedicalCareService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Health Medical Care record by ID' })
  @ApiResponse({ status: 200, type: UpdateHealthMedicalCareOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    param: UpdateHealthMedicalCareInputParamDto,
    @Body() body: UpdateHealthMedicalCareInputBodyDto,
  ): Promise<UpdateHealthMedicalCareOutputDto> {
    return this.healthMedicalCareService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Health Medical Care record by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteHealthMedicalCareOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true }))
    param: DeleteHealthMedicalCareInputParamDto,
  ): Promise<DeleteHealthMedicalCareOutputDto> {
    return this.healthMedicalCareService.delete(param);
  }
}
