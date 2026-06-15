import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { CreateAccountOutputDto } from './dto/output/create-account-output.dto';
import { UpdateAccountOutputDto } from './dto/output/update-account-output.dto';
import { CreateAccountInputBodyDto } from './dto/input/create-account-input-body.dto';
import { FindAllAccountOutputDto } from './dto/output/find-all-account-output.dto';
import { FindAllAccountInputQueryDto } from './dto/input/find-all-account-input-query.dto';
import { FindOneAccountOutputDto } from './dto/output/find-one-account-output.dto';
import { FindOneAccountInputParamDto } from './dto/input/find-one-account-input-param.dto';
import {
  UpdateAccountInputBodyDto,
  UpdateAccountInputParamDto,
} from './dto/input/update-account-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';

@ApiTags('API Account')
@Controller('api/account')
@UseFilters(HttpExceptionFilter)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Account' })
  @ApiResponse({
    status: 200,
    description: 'The Account has been successfully created.',
    type: CreateAccountOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createAccountInputBodyDto: CreateAccountInputBodyDto,
  ): Promise<CreateAccountOutputDto> {
    return await this.accountService.create(createAccountInputBodyDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllAccountOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllAccountInputQueryDto,
  ): Promise<FindAllAccountOutputDto> {
    return await this.accountService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Account with ID' })
  @ApiResponse({ status: 200, type: FindOneAccountOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneAccountInputParamDto,
  ): Promise<FindOneAccountOutputDto> {
    return this.accountService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Account with ID' })
  @ApiResponse({ status: 200, type: UpdateAccountOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateAccountInputParamDto: UpdateAccountInputParamDto,
    @Body() updateAccountInputBodyDto: UpdateAccountInputBodyDto,
  ) {
    return this.accountService.update(
      updateAccountInputParamDto,
      updateAccountInputBodyDto,
    );
  }
}
