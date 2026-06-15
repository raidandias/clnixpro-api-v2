import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemInputBodyDto } from './dto/input/create-order-item-input-body.dto';
import { CreateOrderItemOutputDto } from './dto/output/create-order-item-output.dto';
import { FindAllOrderItemInputQueryDto } from './dto/input/find-all-order-item-input-query.dto';
import { FindAllOrderItemOutputDto } from './dto/output/find-all-order-item-output.dto';
import { FindOneOrderItemInputParamDto } from './dto/input/find-one-order-item-input-param.dto';
import { FindOneOrderItemOutputDto } from './dto/output/find-one-order-item-output.dto';
import { UpdateOrderItemInputBodyDto, UpdateOrderItemInputParamDto } from './dto/input/update-order-item-input-param-hibrido.dto';
import { UpdateOrderItemOutputDto } from './dto/output/update-order-item-output.dto';
import { DeleteOrderItemInputParamDto } from './dto/input/delete-order-item-input-param.dto';
import { DeleteOrderItemOutputDto } from './dto/output/delete-order-item-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order Item')
@Controller('api/health/order-item')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order Item' })
  @ApiResponse({ status: 200, description: 'The Order Item has been successfully created.', type: CreateOrderItemOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderItemInputBodyDto): Promise<CreateOrderItemOutputDto> {
    return this.orderItemService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Order Items' })
  @ApiResponse({ status: 200, type: FindAllOrderItemOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderItemInputQueryDto): Promise<FindAllOrderItemOutputDto> {
    return this.orderItemService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order Item by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderItemOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderItemInputParamDto): Promise<FindOneOrderItemOutputDto> {
    return this.orderItemService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order Item by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderItemOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderItemInputParamDto, @Body() body: UpdateOrderItemInputBodyDto): Promise<UpdateOrderItemOutputDto> {
    return this.orderItemService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order Item by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderItemOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderItemInputParamDto): Promise<DeleteOrderItemOutputDto> {
    return this.orderItemService.delete(param);
  }
}
