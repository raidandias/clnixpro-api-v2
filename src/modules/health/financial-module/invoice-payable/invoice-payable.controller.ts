import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicePayableService } from './invoice-payable.service';
import { CreateInvoicePayableInputBodyDto } from './dto/input/create-invoice-payable-input-body.dto';
import { CreateInvoicePayableOutputDto } from './dto/output/create-invoice-payable-output.dto';
import { FindAllInvoicePayableInputQueryDto } from './dto/input/find-all-invoice-payable-input-query.dto';
import { FindAllInvoicePayableOutputDto } from './dto/output/find-all-invoice-payable-output.dto';
import { FindOneInvoicePayableInputParamDto } from './dto/input/find-one-invoice-payable-input-param.dto';
import { FindOneInvoicePayableOutputDto } from './dto/output/find-one-invoice-payable-output.dto';
import { UpdateInvoicePayableInputBodyDto, UpdateInvoicePayableInputParamDto } from './dto/input/update-invoice-payable-input-param-hibrido.dto';
import { UpdateInvoicePayableOutputDto } from './dto/output/update-invoice-payable-output.dto';
import { DeleteInvoicePayableInputParamDto } from './dto/input/delete-invoice-payable-input-param.dto';
import { DeleteInvoicePayableOutputDto } from './dto/output/delete-invoice-payable-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Invoice Payable')
@Controller('api/invoice-payable')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class InvoicePayableController {
  constructor(private readonly invoicePayableService: InvoicePayableService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Invoice Payable' })
  @ApiResponse({ status: 200, description: 'The Invoice Payable has been successfully created.', type: CreateInvoicePayableOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateInvoicePayableInputBodyDto): Promise<CreateInvoicePayableOutputDto> {
    return this.invoicePayableService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Invoice Payables' })
  @ApiResponse({ status: 200, type: FindAllInvoicePayableOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllInvoicePayableInputQueryDto): Promise<FindAllInvoicePayableOutputDto> {
    return this.invoicePayableService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Invoice Payable by ID' })
  @ApiResponse({ status: 200, type: FindOneInvoicePayableOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneInvoicePayableInputParamDto): Promise<FindOneInvoicePayableOutputDto> {
    return this.invoicePayableService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Invoice Payable by ID' })
  @ApiResponse({ status: 200, type: UpdateInvoicePayableOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateInvoicePayableInputParamDto, @Body() body: UpdateInvoicePayableInputBodyDto): Promise<UpdateInvoicePayableOutputDto> {
    return this.invoicePayableService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Invoice Payable by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteInvoicePayableOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteInvoicePayableInputParamDto): Promise<DeleteInvoicePayableOutputDto> {
    return this.invoicePayableService.delete(param);
  }
}
