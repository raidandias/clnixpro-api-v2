import { Controller, Get, Post, Body, Patch, Param, Query, Delete, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatementService } from './statement.service';
import { CreateStatementInputBodyDto } from './dto/input/create-statement-input-body.dto';
import { CreateStatementOutputDto } from './dto/output/create-statement-output.dto';
import { FindAllStatementInputQueryDto } from './dto/input/find-all-statement-input-query.dto';
import { FindAllStatementOutputDto } from './dto/output/find-all-statement-output.dto';
import { FindOneStatementInputParamDto } from './dto/input/find-one-statement-input-param.dto';
import { FindOneStatementOutputDto } from './dto/output/find-one-statement-output.dto';
import { UpdateStatementInputBodyDto, UpdateStatementInputParamDto } from './dto/input/update-statement-input-param-hibrido.dto';
import { UpdateStatementOutputDto } from './dto/output/update-statement-output.dto';
import { DeleteStatementInputParamDto } from './dto/input/delete-statement-input-param.dto';
import { DeleteStatementOutputDto } from './dto/output/delete-statement-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Statement')
@Controller('api/statement')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Statement' })
  @ApiResponse({ status: 200, description: 'The Statement has been successfully created.', type: CreateStatementOutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: CreateStatementInputBodyDto): Promise<CreateStatementOutputDto> {
    return this.statementService.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Statements' })
  @ApiResponse({ status: 200, type: FindAllStatementOutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAllStatementInputQueryDto): Promise<FindAllStatementOutputDto> {
    return this.statementService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Statement by ID' })
  @ApiResponse({ status: 200, type: FindOneStatementOutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOneStatementInputParamDto): Promise<FindOneStatementOutputDto> {
    return this.statementService.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Statement by ID' })
  @ApiResponse({ status: 200, type: UpdateStatementOutputDto })
  @ApiCommonResponses()
  async update(@Param(new ValidationPipe({ transform: true })) param: UpdateStatementInputParamDto, @Body() body: UpdateStatementInputBodyDto): Promise<UpdateStatementOutputDto> {
    return this.statementService.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Statement by ID' })
  @ApiResponse({ status: 200, type: DeleteStatementOutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: DeleteStatementInputParamDto): Promise<DeleteStatementOutputDto> {
    return this.statementService.delete(param);
  }
}
