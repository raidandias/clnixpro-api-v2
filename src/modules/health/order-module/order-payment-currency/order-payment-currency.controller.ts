import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderPaymentCurrencyService } from './order-payment-currency.service';
import { CreateOrderPaymentCurrencyInputBodyDto } from './dto/input/create-order-payment-currency-input-body.dto';
import { CreateOrderPaymentCurrencyOutputDto } from './dto/output/create-order-payment-currency-output.dto';
import { FindAllOrderPaymentCurrencyInputQueryDto } from './dto/input/find-all-order-payment-currency-input-query.dto';
import { FindAllOrderPaymentCurrencyOutputDto } from './dto/output/find-all-order-payment-currency-output.dto';
import { FindOneOrderPaymentCurrencyInputParamDto } from './dto/input/find-one-order-payment-currency-input-param.dto';
import { FindOneOrderPaymentCurrencyOutputDto } from './dto/output/find-one-order-payment-currency-output.dto';
import { UpdateOrderPaymentCurrencyInputBodyDto, UpdateOrderPaymentCurrencyInputParamDto } from './dto/input/update-order-payment-currency-input-param-hibrido.dto';
import { UpdateOrderPaymentCurrencyOutputDto } from './dto/output/update-order-payment-currency-output.dto';
import { DeleteOrderPaymentCurrencyInputParamDto } from './dto/input/delete-order-payment-currency-input-param.dto';
import { DeleteOrderPaymentCurrencyOutputDto } from './dto/output/delete-order-payment-currency-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order Payment Currency')
@Controller('api/health/order-payment-currency')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderPaymentCurrencyController {
  constructor(private readonly orderPaymentCurrencyService: OrderPaymentCurrencyService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order Payment Currency' })
  @ApiResponse({ status: 200, description: 'The Order Payment Currency has been successfully created.', type: CreateOrderPaymentCurrencyOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderPaymentCurrencyInputBodyDto): Promise<CreateOrderPaymentCurrencyOutputDto> {
    return this.orderPaymentCurrencyService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Order Payment Currencies' })
  @ApiResponse({ status: 200, type: FindAllOrderPaymentCurrencyOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderPaymentCurrencyInputQueryDto): Promise<FindAllOrderPaymentCurrencyOutputDto> {
    return this.orderPaymentCurrencyService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order Payment Currency by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderPaymentCurrencyOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderPaymentCurrencyInputParamDto): Promise<FindOneOrderPaymentCurrencyOutputDto> {
    return this.orderPaymentCurrencyService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order Payment Currency by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderPaymentCurrencyOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderPaymentCurrencyInputParamDto, @Body() body: UpdateOrderPaymentCurrencyInputBodyDto): Promise<UpdateOrderPaymentCurrencyOutputDto> {
    return this.orderPaymentCurrencyService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order Payment Currency by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderPaymentCurrencyOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderPaymentCurrencyInputParamDto): Promise<DeleteOrderPaymentCurrencyOutputDto> {
    return this.orderPaymentCurrencyService.delete(param);
  }
}
