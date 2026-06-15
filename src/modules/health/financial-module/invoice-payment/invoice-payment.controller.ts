import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicePaymentService } from './invoice-payment.service';
import { CreateInvoicePaymentInputBodyDto } from './dto/input/create-invoice-payment-input-body.dto';
import { CreateInvoicePaymentOutputDto } from './dto/output/create-invoice-payment-output.dto';
import { FindAllInvoicePaymentInputQueryDto } from './dto/input/find-all-invoice-payment-input-query.dto';
import { FindAllInvoicePaymentOutputDto } from './dto/output/find-all-invoice-payment-output.dto';
import { FindOneInvoicePaymentInputParamDto } from './dto/input/find-one-invoice-payment-input-param.dto';
import { FindOneInvoicePaymentOutputDto } from './dto/output/find-one-invoice-payment-output.dto';
import { UpdateInvoicePaymentInputBodyDto, UpdateInvoicePaymentInputParamDto } from './dto/input/update-invoice-payment-input-param-hibrido.dto';
import { UpdateInvoicePaymentOutputDto } from './dto/output/update-invoice-payment-output.dto';
import { DeleteInvoicePaymentInputParamDto } from './dto/input/delete-invoice-payment-input-param.dto';
import { DeleteInvoicePaymentOutputDto } from './dto/output/delete-invoice-payment-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Invoice Payment')
@Controller('api/invoice-payment')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class InvoicePaymentController {
  constructor(private readonly invoicePaymentService: InvoicePaymentService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Invoice Payment' })
  @ApiResponse({ status: 200, description: 'The Invoice Payment has been successfully created.', type: CreateInvoicePaymentOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateInvoicePaymentInputBodyDto): Promise<CreateInvoicePaymentOutputDto> {
    return this.invoicePaymentService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Invoice Payments' })
  @ApiResponse({ status: 200, type: FindAllInvoicePaymentOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllInvoicePaymentInputQueryDto): Promise<FindAllInvoicePaymentOutputDto> {
    return this.invoicePaymentService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Invoice Payment by ID' })
  @ApiResponse({ status: 200, type: FindOneInvoicePaymentOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneInvoicePaymentInputParamDto): Promise<FindOneInvoicePaymentOutputDto> {
    return this.invoicePaymentService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Invoice Payment by ID' })
  @ApiResponse({ status: 200, type: UpdateInvoicePaymentOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateInvoicePaymentInputParamDto, @Body() body: UpdateInvoicePaymentInputBodyDto): Promise<UpdateInvoicePaymentOutputDto> {
    return this.invoicePaymentService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Invoice Payment by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteInvoicePaymentOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteInvoicePaymentInputParamDto): Promise<DeleteInvoicePaymentOutputDto> {
    return this.invoicePaymentService.delete(param);
  }
}
