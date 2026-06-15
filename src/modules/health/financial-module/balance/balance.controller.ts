import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { CreateBalanceInputBodyDto } from './dto/input/create-balance-input-body.dto';
import { CreateBalanceOutputDto } from './dto/output/create-balance-output.dto';
import { FindAllBalanceInputQueryDto } from './dto/input/find-all-balance-input-query.dto';
import { FindAllBalanceOutputDto } from './dto/output/find-all-balance-output.dto';
import { FindOneBalanceInputParamDto } from './dto/input/find-one-balance-input-param.dto';
import { FindOneBalanceOutputDto } from './dto/output/find-one-balance-output.dto';
import { UpdateBalanceInputBodyDto, UpdateBalanceInputParamDto } from './dto/input/update-balance-input-param-hibrido.dto';
import { UpdateBalanceOutputDto } from './dto/output/update-balance-output.dto';
import { DeleteBalanceInputParamDto } from './dto/input/delete-balance-input-param.dto';
import { DeleteBalanceOutputDto } from './dto/output/delete-balance-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Balance')
@Controller('api/balance')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Balance' })
  @ApiResponse({ status: 200, description: 'The Balance has been successfully created.', type: CreateBalanceOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateBalanceInputBodyDto): Promise<CreateBalanceOutputDto> {
    return this.balanceService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Balances' })
  @ApiResponse({ status: 200, type: FindAllBalanceOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllBalanceInputQueryDto): Promise<FindAllBalanceOutputDto> {
    return this.balanceService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Balance by ID' })
  @ApiResponse({ status: 200, type: FindOneBalanceOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneBalanceInputParamDto): Promise<FindOneBalanceOutputDto> {
    return this.balanceService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Balance by ID' })
  @ApiResponse({ status: 200, type: UpdateBalanceOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateBalanceInputParamDto, @Body() body: UpdateBalanceInputBodyDto): Promise<UpdateBalanceOutputDto> {
    return this.balanceService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Balance by ID' })
  @ApiResponse({ status: 200, type: DeleteBalanceOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteBalanceInputParamDto): Promise<DeleteBalanceOutputDto> {
    return this.balanceService.delete(param);
  }
}
