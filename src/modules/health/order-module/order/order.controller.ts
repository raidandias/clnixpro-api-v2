import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderInputBodyDto } from './dto/input/create-order-input-body.dto';
import { CreateOrderOutputDto } from './dto/output/create-order-output.dto';
import { FindAllOrderInputQueryDto } from './dto/input/find-all-order-input-query.dto';
import { FindAllOrderOutputDto } from './dto/output/find-all-order-output.dto';
import { FindOneOrderInputParamDto } from './dto/input/find-one-order-input-param.dto';
import { FindOneOrderOutputDto } from './dto/output/find-one-order-output.dto';
import { UpdateOrderInputBodyDto, UpdateOrderInputParamDto } from './dto/input/update-order-input-param-hibrido.dto';
import { UpdateOrderOutputDto } from './dto/output/update-order-output.dto';
import { DeleteOrderInputParamDto } from './dto/input/delete-order-input-param.dto';
import { DeleteOrderOutputDto } from './dto/output/delete-order-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order')
@Controller('api/health/order')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order' })
  @ApiResponse({ status: 200, description: 'The Order has been successfully created.', type: CreateOrderOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderInputBodyDto): Promise<CreateOrderOutputDto> {
    return this.orderService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Orders' })
  @ApiResponse({ status: 200, type: FindAllOrderOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderInputQueryDto): Promise<FindAllOrderOutputDto> {
    return this.orderService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderInputParamDto): Promise<FindOneOrderOutputDto> {
    return this.orderService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderInputParamDto, @Body() body: UpdateOrderInputBodyDto): Promise<UpdateOrderOutputDto> {
    return this.orderService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderInputParamDto): Promise<DeleteOrderOutputDto> {
    return this.orderService.delete(param);
  }
}
