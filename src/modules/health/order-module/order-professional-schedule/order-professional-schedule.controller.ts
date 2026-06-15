import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderProfessionalScheduleService } from './order-professional-schedule.service';
import { CreateOrderProfessionalScheduleInputBodyDto } from './dto/input/create-order-professional-schedule-input-body.dto';
import { CreateOrderProfessionalScheduleOutputDto } from './dto/output/create-order-professional-schedule-output.dto';
import { FindAllOrderProfessionalScheduleInputQueryDto } from './dto/input/find-all-order-professional-schedule-input-query.dto';
import { FindAllOrderProfessionalScheduleOutputDto } from './dto/output/find-all-order-professional-schedule-output.dto';
import { FindOneOrderProfessionalScheduleInputParamDto } from './dto/input/find-one-order-professional-schedule-input-param.dto';
import { FindOneOrderProfessionalScheduleOutputDto } from './dto/output/find-one-order-professional-schedule-output.dto';
import { UpdateOrderProfessionalScheduleInputBodyDto, UpdateOrderProfessionalScheduleInputParamDto } from './dto/input/update-order-professional-schedule-input-param-hibrido.dto';
import { UpdateOrderProfessionalScheduleOutputDto } from './dto/output/update-order-professional-schedule-output.dto';
import { DeleteOrderProfessionalScheduleInputParamDto } from './dto/input/delete-order-professional-schedule-input-param.dto';
import { DeleteOrderProfessionalScheduleOutputDto } from './dto/output/delete-order-professional-schedule-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order Professional Schedule')
@Controller('api/health/order-professional-schedule')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderProfessionalScheduleController {
  constructor(private readonly orderProfessionalScheduleService: OrderProfessionalScheduleService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order Professional Schedule' })
  @ApiResponse({ status: 200, description: 'The Order Professional Schedule has been successfully created.', type: CreateOrderProfessionalScheduleOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderProfessionalScheduleInputBodyDto): Promise<CreateOrderProfessionalScheduleOutputDto> {
    return this.orderProfessionalScheduleService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Order Professional Schedules' })
  @ApiResponse({ status: 200, type: FindAllOrderProfessionalScheduleOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderProfessionalScheduleInputQueryDto): Promise<FindAllOrderProfessionalScheduleOutputDto> {
    return this.orderProfessionalScheduleService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order Professional Schedule by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderProfessionalScheduleOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderProfessionalScheduleInputParamDto): Promise<FindOneOrderProfessionalScheduleOutputDto> {
    return this.orderProfessionalScheduleService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order Professional Schedule by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderProfessionalScheduleOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderProfessionalScheduleInputParamDto, @Body() body: UpdateOrderProfessionalScheduleInputBodyDto): Promise<UpdateOrderProfessionalScheduleOutputDto> {
    return this.orderProfessionalScheduleService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order Professional Schedule by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderProfessionalScheduleOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderProfessionalScheduleInputParamDto): Promise<DeleteOrderProfessionalScheduleOutputDto> {
    return this.orderProfessionalScheduleService.delete(param);
  }
}
