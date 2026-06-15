import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProfessionalItemInputBodyDto } from './dto/input/create-professional-item-input-body.dto';
import { FindAllProfessionalItemInputQueryDto } from './dto/input/find-all-professional-item-input-query.dto';
import { FindOneProfessionalItemInputParamDto } from './dto/input/find-one-professional-item-input-param.dto';
import { UpdateProfessionalItemInputBodyDto } from './dto/input/update-professional-item-input-body.dto';
import { CreateProfessionalItemOutputDto } from './dto/output/create-professional-item-output.dto';
import { FindAllProfessionalItemOutputDto } from './dto/output/find-all-professional-item-output.dto';
import { FindOneProfessionalItemOutputDto } from './dto/output/find-one-professional-item-output.dto';
import { UpdateProfessionalItemOutputDto } from './dto/output/update-professional-item-output.dto';
import { ProfessionalItemService } from './professional-item.service';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Professional Items')
@Controller('api/professional-items')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class ProfessionalItemController {
  constructor(
    private readonly professionalItemService: ProfessionalItemService,
  ) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a professional item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Professional item created successfully.',
    type: CreateProfessionalItemOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createProfessionalItemDto: CreateProfessionalItemInputBodyDto,
  ): Promise<CreateProfessionalItemOutputDto> {
    return await this.professionalItemService.create(createProfessionalItemDto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all professional items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professional items found successfully.',
    type: FindAllProfessionalItemOutputDto,
  })
  @ApiCommonResponses()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllProfessionalItemInputQueryDto,
  ): Promise<FindAllProfessionalItemOutputDto> {
    return await this.professionalItemService.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Find one professional item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professional item found successfully.',
    type: FindOneProfessionalItemOutputDto,
  })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    params: FindOneProfessionalItemInputParamDto,
  ): Promise<FindOneProfessionalItemOutputDto> {
    return await this.professionalItemService.findOne(params.id);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update a professional item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professional item updated successfully.',
    type: UpdateProfessionalItemOutputDto,
  })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    params: FindOneProfessionalItemInputParamDto,
    @Body() updateProfessionalItemDto: UpdateProfessionalItemInputBodyDto,
  ): Promise<UpdateProfessionalItemOutputDto> {
    return await this.professionalItemService.update(
      params.id,
      updateProfessionalItemDto,
    );
  }

  @Delete('/v1/remove/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a professional item' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Professional item removed successfully.',
  })
  @ApiCommonResponses()
  async remove(
    @Param(new ValidationPipe({ transform: true }))
    params: FindOneProfessionalItemInputParamDto,
  ): Promise<void> {
    return await this.professionalItemService.remove(params.id);
  }
}
