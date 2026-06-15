import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerInputBodyDto } from './dto/input/create-customer-input-body.dto';
import { CreateCustomerOutputDto } from './dto/output/create-customer-output.dto';
import { FindAllCustomerInputQueryDto } from './dto/input/find-all-customer-input-query.dto';
import { FindAllCustomerOutputDto } from './dto/output/find-all-customer-output.dto';
import { FindOneCustomerInputParamDto } from './dto/input/find-one-customer-input-param.dto';
import { FindOneCustomerOutputDto } from './dto/output/find-one-customer-output.dto';
import { UpdateCustomerInputBodyDto, UpdateCustomerInputParamDto } from './dto/input/update-customer-input-param-hibrido.dto';
import { UpdateCustomerOutputDto } from './dto/output/update-customer-output.dto';
import { DeleteCustomerInputParamDto } from './dto/input/delete-customer-input-param.dto';
import { DeleteCustomerOutputDto } from './dto/output/delete-customer-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Customer')
@Controller('api/customer')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Customer' })
  @ApiResponse({ status: 200, description: 'The Customer has been successfully created.', type: CreateCustomerOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateCustomerInputBodyDto): Promise<CreateCustomerOutputDto> {
    return this.customerService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Customers' })
  @ApiResponse({ status: 200, type: FindAllCustomerOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllCustomerInputQueryDto): Promise<FindAllCustomerOutputDto> {
    return this.customerService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Customer by ID' })
  @ApiResponse({ status: 200, type: FindOneCustomerOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneCustomerInputParamDto): Promise<FindOneCustomerOutputDto> {
    return this.customerService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Customer by ID' })
  @ApiResponse({ status: 200, type: UpdateCustomerOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateCustomerInputParamDto, @Body() body: UpdateCustomerInputBodyDto): Promise<UpdateCustomerOutputDto> {
    return this.customerService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Customer by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteCustomerOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteCustomerInputParamDto): Promise<DeleteCustomerOutputDto> {
    return this.customerService.delete(param);
  }
}
