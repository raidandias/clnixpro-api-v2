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

import { HealthInsuranceService } from './health-insurance.service';
import { CreateHealthInsuranceOutputDto } from './dto/output/create-health-insurance-output.dto';
import { UpdateHealthInsuranceOutputDto } from './dto/output/update-health-insurance-output.dto';
import { CreateHealthInsuranceInputBodyDto } from './dto/input/create-health-insurance-input-body.dto';
import { FindAllHealthInsuranceOutputDto } from './dto/output/find-all-health-insurance-output.dto';
import { FindAllHealthInsuranceInputQueryDto } from './dto/input/find-all-health-insurance-input-query.dto';
import { FindOneHealthInsuranceOutputDto } from './dto/output/find-one-health-insurance-output.dto';
import { FindOneHealthInsuranceInputParamDto } from './dto/input/find-one-health-insurance-input-param.dto';
import {
  UpdateHealthInsuranceInputBodyDto,
  UpdateHealthInsuranceInputParamDto,
} from './dto/input/update-health-insurance-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Health Insurance')
@Controller('api/health-insurance')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class HealthInsuranceController {
  constructor(
    private readonly healthInsuranceService: HealthInsuranceService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new HealthInsurance' })
  @ApiResponse({
    status: 200,
    description: 'The HealthInsurance has been successfully created.',
    type: CreateHealthInsuranceOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createHealthInsuranceInputBodyDto: CreateHealthInsuranceInputBodyDto,
  ): Promise<CreateHealthInsuranceOutputDto> {
    return await this.healthInsuranceService.create(
      createHealthInsuranceInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllHealthInsuranceInputQueryDto,
  ): Promise<FindAllHealthInsuranceOutputDto> {
    return await this.healthInsuranceService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get HealthInsurance with ID' })
  @ApiResponse({ status: 200, type: FindOneHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneHealthInsuranceInputParamDto,
  ): Promise<FindOneHealthInsuranceOutputDto> {
    return this.healthInsuranceService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update HealthInsurance with ID' })
  @ApiResponse({ status: 200, type: UpdateHealthInsuranceOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateHealthInsuranceInputParamDto: UpdateHealthInsuranceInputParamDto,
    @Body()
    updateHealthInsuranceInputBodyDto: UpdateHealthInsuranceInputBodyDto,
  ) {
    return this.healthInsuranceService.update(
      updateHealthInsuranceInputParamDto,
      updateHealthInsuranceInputBodyDto,
    );
  }
}
