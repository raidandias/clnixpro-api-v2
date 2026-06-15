import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderPaymentService } from './order-payment.service';
import { CreateOrderPaymentInputBodyDto } from './dto/input/create-order-payment-input-body.dto';
import { CreateOrderPaymentOutputDto } from './dto/output/create-order-payment-output.dto';
import { FindAllOrderPaymentInputQueryDto } from './dto/input/find-all-order-payment-input-query.dto';
import { FindAllOrderPaymentOutputDto } from './dto/output/find-all-order-payment-output.dto';
import { FindOneOrderPaymentInputParamDto } from './dto/input/find-one-order-payment-input-param.dto';
import { FindOneOrderPaymentOutputDto } from './dto/output/find-one-order-payment-output.dto';
import { UpdateOrderPaymentInputBodyDto, UpdateOrderPaymentInputParamDto } from './dto/input/update-order-payment-input-param-hibrido.dto';
import { UpdateOrderPaymentOutputDto } from './dto/output/update-order-payment-output.dto';
import { DeleteOrderPaymentInputParamDto } from './dto/input/delete-order-payment-input-param.dto';
import { DeleteOrderPaymentOutputDto } from './dto/output/delete-order-payment-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order Payment')
@Controller('api/health/order-payment')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order Payment' })
  @ApiResponse({ status: 200, description: 'The Order Payment has been successfully created.', type: CreateOrderPaymentOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderPaymentInputBodyDto): Promise<CreateOrderPaymentOutputDto> {
    return this.orderPaymentService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Order Payments' })
  @ApiResponse({ status: 200, type: FindAllOrderPaymentOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderPaymentInputQueryDto): Promise<FindAllOrderPaymentOutputDto> {
    return this.orderPaymentService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order Payment by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderPaymentOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderPaymentInputParamDto): Promise<FindOneOrderPaymentOutputDto> {
    return this.orderPaymentService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order Payment by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderPaymentOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderPaymentInputParamDto, @Body() body: UpdateOrderPaymentInputBodyDto): Promise<UpdateOrderPaymentOutputDto> {
    return this.orderPaymentService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order Payment by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderPaymentOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderPaymentInputParamDto): Promise<DeleteOrderPaymentOutputDto> {
    return this.orderPaymentService.delete(param);
  }
}
