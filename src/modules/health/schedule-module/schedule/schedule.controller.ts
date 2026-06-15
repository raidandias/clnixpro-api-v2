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

import { ScheduleService } from './schedule.service';
import { CreateScheduleInputBodyDto } from './dto/input/create-schedule-input-body.dto';
import { CreateScheduleOutputDto } from './dto/output/create-schedule-output.dto';
import { FindAllScheduleInputQueryDto } from './dto/input/find-all-schedule-input-query.dto';
import { FindAllScheduleOutputDto } from './dto/output/find-all-schedule-output.dto';
import { FindOneScheduleInputParamDto } from './dto/input/find-one-schedule-input-param.dto';
import { FindOneScheduleOutputDto } from './dto/output/find-one-schedule-output.dto';
import { UpdateScheduleInputBodyDto, UpdateScheduleInputParamDto } from './dto/input/update-schedule-input-param-hibrido.dto';
import { UpdateScheduleOutputDto } from './dto/output/update-schedule-output.dto';
import { DeleteScheduleInputParamDto } from './dto/input/delete-schedule-input-param.dto';
import { DeleteScheduleOutputDto } from './dto/output/delete-schedule-output.dto';
import { RescheduleInputBodyDto, RescheduleInputParamDto } from './dto/input/reschedule-input-param-hibrido.dto';
import { PreScheduleActionOutputDto } from './dto/output/pre-schedule-action-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Schedule')
@Controller('api/schedule')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Schedule' })
  @ApiResponse({
    status: 200,
    description: 'The Schedule has been successfully created.',
    type: CreateScheduleOutputDto,
  })
  @ApiCommonResponses()
  async create(@Body() dto: CreateScheduleInputBodyDto): Promise<CreateScheduleOutputDto> {
    return this.scheduleService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Schedules' })
  @ApiResponse({ status: 200, type: FindAllScheduleOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: FindAllScheduleInputQueryDto,
  ): Promise<FindAllScheduleOutputDto> {
    return this.scheduleService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Schedule by ID' })
  @ApiResponse({ status: 200, type: FindOneScheduleOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true })) param: FindOneScheduleInputParamDto,
  ): Promise<FindOneScheduleOutputDto> {
    return this.scheduleService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Schedule by ID' })
  @ApiResponse({ status: 200, type: UpdateScheduleOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true })) param: UpdateScheduleInputParamDto,
    @Body() body: UpdateScheduleInputBodyDto,
  ): Promise<UpdateScheduleOutputDto> {
    return this.scheduleService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Schedule by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteScheduleOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true })) param: DeleteScheduleInputParamDto,
  ): Promise<DeleteScheduleOutputDto> {
    return this.scheduleService.delete(param);
  }

  // ─── Pré-agendamento ───────────────────────────────────────────

  @Patch('/v1/confirm/:id')
  @ApiOperation({
    summary: 'Confirmar pré-agendamento',
    description:
      'Secretaria confirma o retorno do paciente. Atualiza status para CONFIRMED, ' +
      'registra o participante com confirmedAt e cria log.',
  })
  @ApiResponse({ status: 200, type: PreScheduleActionOutputDto })
  @ApiCommonResponses()
  async confirm(
    @Param(new ValidationPipe({ transform: true })) param: DeleteScheduleInputParamDto,
  ): Promise<PreScheduleActionOutputDto> {
    return this.scheduleService.confirm(param.id);
  }

  @Patch('/v1/decline/:id')
  @ApiOperation({
    summary: 'Recusar pré-agendamento',
    description:
      'Paciente não compareceu ou recusou. Atualiza status para CANCELED, ' +
      'registra o participante com declinedAt e cria log.',
  })
  @ApiResponse({ status: 200, type: PreScheduleActionOutputDto })
  @ApiCommonResponses()
  async decline(
    @Param(new ValidationPipe({ transform: true })) param: DeleteScheduleInputParamDto,
  ): Promise<PreScheduleActionOutputDto> {
    return this.scheduleService.decline(param.id);
  }

  @Patch('/v1/reschedule/:id')
  @ApiOperation({
    summary: 'Solicitar remarcação de pré-agendamento',
    description:
      'Paciente solicita nova data. Status permanece WAITING, participante recebe ' +
      'rescheduledAt + rescheduledTo e um log é criado. Opcionalmente atualiza as datas do agendamento.',
  })
  @ApiResponse({ status: 200, type: PreScheduleActionOutputDto })
  @ApiCommonResponses()
  async reschedule(
    @Param(new ValidationPipe({ transform: true })) param: RescheduleInputParamDto,
    @Body() body: RescheduleInputBodyDto,
  ): Promise<PreScheduleActionOutputDto> {
    return this.scheduleService.reschedule(param, body);
  }
}
