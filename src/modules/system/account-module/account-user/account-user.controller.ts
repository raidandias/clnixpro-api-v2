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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AccountUserService } from './account-user.service';
import { CreateAccountUserOutputDto } from './dto/output/create-account-user-output.dto';
import { UpdateAccountUserOutputDto } from './dto/output/update-account-user-output.dto';
import { CreateAccountUserInputBodyDto } from './dto/input/create-account-user-input-body.dto';
import { FindAllAccountUserOutputDto } from './dto/output/find-all-account-user-output.dto';
import { FindAllAccountUserInputQueryDto } from './dto/input/find-all-account-user-input-query.dto';
import { FindOneAccountUserOutputDto } from './dto/output/find-one-account-user-output.dto';
import { FindOneAccountUserInputParamDto } from './dto/input/find-one-account-user-input-param.dto';
import {
  UpdateAccountUserInputBodyDto,
  UpdateAccountUserInputParamDto,
} from './dto/input/update-account-user-input-param-hibrido.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from '../../auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Account User')
@Controller('api/account-user')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class AccountUserController {
  constructor(private readonly accountUserService: AccountUserService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new AccountUser' })
  @ApiResponse({
    status: 200,
    description: 'The AccountUser has been successfully created.',
    type: CreateAccountUserOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createAccountUserInputBodyDto: CreateAccountUserInputBodyDto,
  ): Promise<CreateAccountUserOutputDto> {
    return await this.accountUserService.create(createAccountUserInputBodyDto);
  }

  @Get('/v1/find-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Find all ' })
  @ApiResponse({ status: 200, type: FindAllAccountUserOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllAccountUserInputQueryDto,
  ): Promise<FindAllAccountUserOutputDto> {
    return await this.accountUserService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get AccountUser with ID' })
  @ApiResponse({ status: 200, type: FindOneAccountUserOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneAccountUserInputParamDto,
  ): Promise<FindOneAccountUserOutputDto> {
    return this.accountUserService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update AccountUser with ID' })
  @ApiResponse({ status: 200, type: UpdateAccountUserOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateAccountUserInputParamDto: UpdateAccountUserInputParamDto,
    @Body() updateAccountUserInputBodyDto: UpdateAccountUserInputBodyDto,
  ) {
    return this.accountUserService.update(
      updateAccountUserInputParamDto,
      updateAccountUserInputBodyDto,
    );
  }
}
