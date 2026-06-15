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

import { ScheduleLogsService } from './schedule-logs.service';
import { CreateScheduleLogsInputBodyDto } from './dto/input/create-schedule-logs-input-body.dto';
import { CreateScheduleLogsOutputDto } from './dto/output/create-schedule-logs-output.dto';
import { FindAllScheduleLogsInputQueryDto } from './dto/input/find-all-schedule-logs-input-query.dto';
import { FindAllScheduleLogsOutputDto } from './dto/output/find-all-schedule-logs-output.dto';
import { FindOneScheduleLogsInputParamDto } from './dto/input/find-one-schedule-logs-input-param.dto';
import { FindOneScheduleLogsOutputDto } from './dto/output/find-one-schedule-logs-output.dto';
import { UpdateScheduleLogsInputBodyDto, UpdateScheduleLogsInputParamDto } from './dto/input/update-schedule-logs-input-param-hibrido.dto';
import { UpdateScheduleLogsOutputDto } from './dto/output/update-schedule-logs-output.dto';
import { DeleteScheduleLogsInputParamDto } from './dto/input/delete-schedule-logs-input-param.dto';
import { DeleteScheduleLogsOutputDto } from './dto/output/delete-schedule-logs-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Schedule Logs')
@Controller('api/schedule-logs')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ScheduleLogsController {
  constructor(private readonly scheduleLogsService: ScheduleLogsService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Schedule Log' })
  @ApiResponse({
    status: 200,
    description: 'The Schedule Log has been successfully created.',
    type: CreateScheduleLogsOutputDto,
  })
  @ApiCommonResponses()
  async create(@Body() dto: CreateScheduleLogsInputBodyDto): Promise<CreateScheduleLogsOutputDto> {
    return this.scheduleLogsService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Schedule Logs' })
  @ApiResponse({ status: 200, type: FindAllScheduleLogsOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: FindAllScheduleLogsInputQueryDto,
  ): Promise<FindAllScheduleLogsOutputDto> {
    return this.scheduleLogsService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Schedule Log by ID' })
  @ApiResponse({ status: 200, type: FindOneScheduleLogsOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true })) param: FindOneScheduleLogsInputParamDto,
  ): Promise<FindOneScheduleLogsOutputDto> {
    return this.scheduleLogsService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Schedule Log by ID' })
  @ApiResponse({ status: 200, type: UpdateScheduleLogsOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true })) param: UpdateScheduleLogsInputParamDto,
    @Body() body: UpdateScheduleLogsInputBodyDto,
  ): Promise<UpdateScheduleLogsOutputDto> {
    return this.scheduleLogsService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Schedule Log by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteScheduleLogsOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true })) param: DeleteScheduleLogsInputParamDto,
  ): Promise<DeleteScheduleLogsOutputDto> {
    return this.scheduleLogsService.delete(param);
  }
}
