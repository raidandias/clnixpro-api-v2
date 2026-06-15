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

import { ScheduleParticipantService } from './schedule-participant.service';
import { CreateScheduleParticipantInputBodyDto } from './dto/input/create-schedule-participant-input-body.dto';
import { CreateScheduleParticipantOutputDto } from './dto/output/create-schedule-participant-output.dto';
import { FindAllScheduleParticipantInputQueryDto } from './dto/input/find-all-schedule-participant-input-query.dto';
import { FindAllScheduleParticipantOutputDto } from './dto/output/find-all-schedule-participant-output.dto';
import { FindOneScheduleParticipantInputParamDto } from './dto/input/find-one-schedule-participant-input-param.dto';
import { FindOneScheduleParticipantOutputDto } from './dto/output/find-one-schedule-participant-output.dto';
import { UpdateScheduleParticipantInputBodyDto, UpdateScheduleParticipantInputParamDto } from './dto/input/update-schedule-participant-input-param-hibrido.dto';
import { UpdateScheduleParticipantOutputDto } from './dto/output/update-schedule-participant-output.dto';
import { DeleteScheduleParticipantInputParamDto } from './dto/input/delete-schedule-participant-input-param.dto';
import { DeleteScheduleParticipantOutputDto } from './dto/output/delete-schedule-participant-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Schedule Participant')
@Controller('api/schedule-participant')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ScheduleParticipantController {
  constructor(private readonly scheduleParticipantService: ScheduleParticipantService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Schedule Participant' })
  @ApiResponse({
    status: 200,
    description: 'The Schedule Participant has been successfully created.',
    type: CreateScheduleParticipantOutputDto,
  })
  @ApiCommonResponses()
  async create(@Body() dto: CreateScheduleParticipantInputBodyDto): Promise<CreateScheduleParticipantOutputDto> {
    return this.scheduleParticipantService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Schedule Participants' })
  @ApiResponse({ status: 200, type: FindAllScheduleParticipantOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: FindAllScheduleParticipantInputQueryDto,
  ): Promise<FindAllScheduleParticipantOutputDto> {
    return this.scheduleParticipantService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Schedule Participant by ID' })
  @ApiResponse({ status: 200, type: FindOneScheduleParticipantOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true })) param: FindOneScheduleParticipantInputParamDto,
  ): Promise<FindOneScheduleParticipantOutputDto> {
    return this.scheduleParticipantService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Schedule Participant by ID' })
  @ApiResponse({ status: 200, type: UpdateScheduleParticipantOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true })) param: UpdateScheduleParticipantInputParamDto,
    @Body() body: UpdateScheduleParticipantInputBodyDto,
  ): Promise<UpdateScheduleParticipantOutputDto> {
    return this.scheduleParticipantService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Schedule Participant by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteScheduleParticipantOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true })) param: DeleteScheduleParticipantInputParamDto,
  ): Promise<DeleteScheduleParticipantOutputDto> {
    return this.scheduleParticipantService.delete(param);
  }
}
