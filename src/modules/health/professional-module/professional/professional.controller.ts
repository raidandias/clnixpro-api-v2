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
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProfessionalService } from './professional.service';
import { CreateProfessionalInputBodyDto } from './dto/input/create-professional-input-body.dto';
import { CreateProfessionalOutputDto } from './dto/output/create-professional-output.dto';
import { FindAllProfessionalInputQueryDto } from './dto/input/find-all-professional-input-query.dto';
import { FindAllProfessionalOutputDto } from './dto/output/find-all-professional-output.dto';
import { FindOneProfessionalInputParamDto } from './dto/input/find-one-professional-input-param.dto';
import { FindOneProfessionalOutputDto } from './dto/output/find-one-professional-output.dto';
import {
  UpdateProfessionalInputBodyDto,
  UpdateProfessionalInputParamDto,
} from './dto/input/update-professional-input-param-hibrido.dto';
import { UpdateProfessionalOutputDto } from './dto/output/update-professional-output.dto';
import { DeleteProfessionalInputParamDto } from './dto/input/delete-professional-input-param.dto';
import { DeleteProfessionalOutputDto } from './dto/output/delete-professional-output.dto';
import { CreateProfessionalWithUserInputBodyDto } from './dto/input/create-professional-with-user-input-body.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Professional')
@Controller('api/professional')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Professional' })
  @ApiResponse({
    status: 200,
    description: 'The Professional has been successfully created.',
    type: CreateProfessionalOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body()
    createProfessionalInputBodyDto: CreateProfessionalInputBodyDto,
  ): Promise<CreateProfessionalOutputDto> {
    return await this.professionalService.create(
      createProfessionalInputBodyDto,
    );
  }

  @Post('/v1/create-with-user')
  @ApiOperation({ summary: 'Create a new Professional with User data' })
  @ApiResponse({
    status: 200,
    description: 'The Professional and User have been successfully created.',
    type: CreateProfessionalOutputDto,
  })
  @ApiCommonResponses()
  async createWithUser(
    @Body()
    createProfessionalWithUserInputBodyDto: CreateProfessionalWithUserInputBodyDto,
  ): Promise<CreateProfessionalOutputDto> {
    return await this.professionalService.createWithUser(
      createProfessionalWithUserInputBodyDto,
    );
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all Professionals' })
  @ApiResponse({ status: 200, type: FindAllProfessionalOutputDto })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllProfessionalInputQueryDto,
  ): Promise<FindAllProfessionalOutputDto> {
    return await this.professionalService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get Professional with ID' })
  @ApiResponse({ status: 200, type: FindOneProfessionalOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneProfessionalInputParamDto,
  ): Promise<FindOneProfessionalOutputDto> {
    return this.professionalService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update Professional with ID' })
  @ApiResponse({ status: 200, type: UpdateProfessionalOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    updateProfessionalInputParamDto: UpdateProfessionalInputParamDto,
    @Body()
    updateProfessionalInputBodyDto: UpdateProfessionalInputBodyDto,
  ) {
    return this.professionalService.update(
      updateProfessionalInputParamDto,
      updateProfessionalInputBodyDto,
    );
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Delete Professional with ID (Soft Delete)' })
  @ApiResponse({ status: 200, type: DeleteProfessionalOutputDto })
  @ApiCommonResponses()
  async delete(
    @Param(new ValidationPipe({ transform: true }))
    deleteProfessionalInputParamDto: DeleteProfessionalInputParamDto,
  ): Promise<DeleteProfessionalOutputDto> {
    return this.professionalService.delete(deleteProfessionalInputParamDto);
  }
}
