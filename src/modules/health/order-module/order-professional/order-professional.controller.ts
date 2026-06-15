import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderProfessionalService } from './order-professional.service';
import { CreateOrderProfessionalInputBodyDto } from './dto/input/create-order-professional-input-body.dto';
import { CreateOrderProfessionalOutputDto } from './dto/output/create-order-professional-output.dto';
import { FindAllOrderProfessionalInputQueryDto } from './dto/input/find-all-order-professional-input-query.dto';
import { FindAllOrderProfessionalOutputDto } from './dto/output/find-all-order-professional-output.dto';
import { FindOneOrderProfessionalInputParamDto } from './dto/input/find-one-order-professional-input-param.dto';
import { FindOneOrderProfessionalOutputDto } from './dto/output/find-one-order-professional-output.dto';
import { UpdateOrderProfessionalInputBodyDto, UpdateOrderProfessionalInputParamDto } from './dto/input/update-order-professional-input-param-hibrido.dto';
import { UpdateOrderProfessionalOutputDto } from './dto/output/update-order-professional-output.dto';
import { DeleteOrderProfessionalInputParamDto } from './dto/input/delete-order-professional-input-param.dto';
import { DeleteOrderProfessionalOutputDto } from './dto/output/delete-order-professional-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Order Professional')
@Controller('api/health/order-professional')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class OrderProfessionalController {
  constructor(private readonly orderProfessionalService: OrderProfessionalService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Order Professional' })
  @ApiResponse({ status: 200, description: 'The Order Professional has been successfully created.', type: CreateOrderProfessionalOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateOrderProfessionalInputBodyDto): Promise<CreateOrderProfessionalOutputDto> {
    return this.orderProfessionalService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Order Professionals' })
  @ApiResponse({ status: 200, type: FindAllOrderProfessionalOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllOrderProfessionalInputQueryDto): Promise<FindAllOrderProfessionalOutputDto> {
    return this.orderProfessionalService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Order Professional by ID' })
  @ApiResponse({ status: 200, type: FindOneOrderProfessionalOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneOrderProfessionalInputParamDto): Promise<FindOneOrderProfessionalOutputDto> {
    return this.orderProfessionalService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Order Professional by ID' })
  @ApiResponse({ status: 200, type: UpdateOrderProfessionalOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateOrderProfessionalInputParamDto, @Body() body: UpdateOrderProfessionalInputBodyDto): Promise<UpdateOrderProfessionalOutputDto> {
    return this.orderProfessionalService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Order Professional by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteOrderProfessionalOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteOrderProfessionalInputParamDto): Promise<DeleteOrderProfessionalOutputDto> {
    return this.orderProfessionalService.delete(param);
  }
}
