import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceReceivableService } from './invoice-receivable.service';
import { CreateInvoiceReceivableInputBodyDto } from './dto/input/create-invoice-receivable-input-body.dto';
import { CreateInvoiceReceivableOutputDto } from './dto/output/create-invoice-receivable-output.dto';
import { FindAllInvoiceReceivableInputQueryDto } from './dto/input/find-all-invoice-receivable-input-query.dto';
import { FindAllInvoiceReceivableOutputDto } from './dto/output/find-all-invoice-receivable-output.dto';
import { FindOneInvoiceReceivableInputParamDto } from './dto/input/find-one-invoice-receivable-input-param.dto';
import { FindOneInvoiceReceivableOutputDto } from './dto/output/find-one-invoice-receivable-output.dto';
import { UpdateInvoiceReceivableInputBodyDto, UpdateInvoiceReceivableInputParamDto } from './dto/input/update-invoice-receivable-input-param-hibrido.dto';
import { UpdateInvoiceReceivableOutputDto } from './dto/output/update-invoice-receivable-output.dto';
import { DeleteInvoiceReceivableInputParamDto } from './dto/input/delete-invoice-receivable-input-param.dto';
import { DeleteInvoiceReceivableOutputDto } from './dto/output/delete-invoice-receivable-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Invoice Receivable')
@Controller('api/invoice-receivable')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class InvoiceReceivableController {
  constructor(private readonly invoiceReceivableService: InvoiceReceivableService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Invoice Receivable' })
  @ApiResponse({ status: 200, description: 'The Invoice Receivable has been successfully created.', type: CreateInvoiceReceivableOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateInvoiceReceivableInputBodyDto): Promise<CreateInvoiceReceivableOutputDto> {
    return this.invoiceReceivableService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Invoice Receivables' })
  @ApiResponse({ status: 200, type: FindAllInvoiceReceivableOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllInvoiceReceivableInputQueryDto): Promise<FindAllInvoiceReceivableOutputDto> {
    return this.invoiceReceivableService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Invoice Receivable by ID' })
  @ApiResponse({ status: 200, type: FindOneInvoiceReceivableOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneInvoiceReceivableInputParamDto): Promise<FindOneInvoiceReceivableOutputDto> {
    return this.invoiceReceivableService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Invoice Receivable by ID' })
  @ApiResponse({ status: 200, type: UpdateInvoiceReceivableOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateInvoiceReceivableInputParamDto, @Body() body: UpdateInvoiceReceivableInputBodyDto): Promise<UpdateInvoiceReceivableOutputDto> {
    return this.invoiceReceivableService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Invoice Receivable by ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteInvoiceReceivableOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteInvoiceReceivableInputParamDto): Promise<DeleteInvoiceReceivableOutputDto> {
    return this.invoiceReceivableService.delete(param);
  }
}
