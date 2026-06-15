import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ValidationPipe,
  NotFoundException,
  UseFilters,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserOutputDto } from './dto/output/create-user-output.dto';
import { UpdateUserOutputDto } from './dto/output/update-user-output.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserInputBodyDto } from './dto/input/create-user-input.dto';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { FindAllUsersOutputDto } from './dto/output/find-all-user-output.dto';
import { FindAllUsersInputQueryDto } from './dto/input/find-all-user-input.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { FindOneUserOutputDto } from './dto/output/find-one-user-output.dto';
import { FindOneUserInputParamDto } from './dto/input/find-one-user-input.dto';
import {
  UpdateUserInputBodyDto,
  UpdateUserInputParamDto,
} from './dto/input/update-user-input.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  UploadImageUserInputBodyDto,
  UploadImageUserInputParamDto,
} from './dto/input/photo-user-input.dto';
import { PhotoUserOutputDto } from './dto/output/photo-user-output.dto';
import { CreateUserDocumentOutputDto } from './dto/output/create-user-document-output';
import {
  CreateUserDocumentInputBodyDto,
  CreateUserDocumentInputParamDto,
} from './dto/input/create-user-document-input.dto';
import {
  UpdateUserDocumentInputBodyDto,
  UpdateUserDocumentInputParamDto,
} from './dto/input/update-user-document-input.dto';
import {
  CreateAddressInputBodyDto,
  CreateAddressInputParamDto,
} from './dto/input/create-user-address-input.dto';
import { CreateAddressOutputDto } from './dto/output/create-user-address-output';
import {
  UpdateAddressInputBodyDto,
  UpdateAddressInputParamDto,
} from './dto/input/update-user-address-input.dto';
import { JwtAuthGuard } from '../auth-module/auth/jwt-auth.guard';

@ApiTags('API Users')
@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created.',
    type: CreateUserOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createUserInputBodyDto: CreateUserInputBodyDto,
  ): Promise<CreateUserOutputDto> {
    try {
      return await this.usersService.create(createUserInputBodyDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, type: FindAllUsersOutputDto })
  @ApiCommonResponses()
  @ApiExcludeEndpoint()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: FindAllUsersInputQueryDto,
  ): Promise<FindAllUsersOutputDto> {
    return await this.usersService.findAll(
      Number(query.page),
      Number(query.perPage),
      query.name,
      query.email,
      query.documentNumber,
      query.city,
    );
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get user with ID' })
  @ApiResponse({ status: 200, type: FindOneUserOutputDto })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneUserInputParamDto,
  ): Promise<FindOneUserOutputDto> {
    return this.usersService.findOne({ id: param.id });
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update user with ID' })
  @ApiResponse({ status: 200, type: UpdateUserOutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true }))
    param: UpdateUserInputParamDto,
    @Body() updateUserInputBodyDto: UpdateUserInputBodyDto,
  ) {
    return this.usersService.update(param.id, updateUserInputBodyDto);
  }

  @Post('/v1/photo/:id')
  @ApiOperation({ summary: 'Upload image user with ID' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageUserInputBodyDto })
  @ApiCommonResponses()
  async photo(
    @Param(new ValidationPipe({ transform: true }))
    param: UploadImageUserInputParamDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PhotoUserOutputDto> {
    return this.usersService.photo(param.id, file);
  }

  @Post('/v1/create-user-document/:userId')
  @ApiOperation({ summary: 'Create a new user document' })
  @UseInterceptors(FileInterceptor('filePath'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDocumentInputBodyDto })
  @ApiCommonResponses()
  async createUserDocument(
    @Body() createUserDocumentInputBodyDto: CreateUserDocumentInputBodyDto,
    @Param(new ValidationPipe({ transform: true }))
    param: CreateUserDocumentInputParamDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateUserDocumentOutputDto> {
    return await this.usersService.createUserDocument(
      createUserDocumentInputBodyDto,
      param.userId,
      file,
    );
  }

  @Patch('/v1/update-user-document/:userId/:documentId')
  @ApiOperation({ summary: 'Update an existing user document' })
  @UseInterceptors(FileInterceptor('filePath'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDocumentInputBodyDto })
  async updateUserDocument(
    @Param(new ValidationPipe({ transform: true }))
    param: UpdateUserDocumentInputParamDto,
    @Body() updateUserDocumentInputBodyDto: UpdateUserDocumentInputBodyDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreateUserDocumentOutputDto> {
    return await this.usersService.updateUserDocument(
      param.documentId,
      updateUserDocumentInputBodyDto,
      param.userId,
      file,
    );
  }

  @Post('/v1/create-user-address/:userId')
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({ type: CreateAddressInputBodyDto })
  @ApiCommonResponses()
  async createAddress(
    @Body() createAddressInputBodyDto: CreateAddressInputBodyDto,
    @Param(new ValidationPipe({ transform: true }))
    param: CreateAddressInputParamDto,
  ): Promise<CreateAddressOutputDto> {
    return await this.usersService.createUserAddress(
      createAddressInputBodyDto,
      param.userId,
    );
  }

  @Patch('/v1/update-user-address/:userId/:addressId')
  @ApiOperation({ summary: 'Update an existing address' })
  @ApiConsumes('application/json')
  @ApiBody({ type: UpdateAddressInputBodyDto })
  @ApiCommonResponses()
  async updateAddress(
    @Param(new ValidationPipe({ transform: true }))
    params: UpdateAddressInputParamDto,
    @Body() updateAddressInputBodyDto: UpdateAddressInputBodyDto,
  ): Promise<UpdateAddressInputBodyDto> {
    return await this.usersService.updateUserAddress(
      params.userId,
      params.addressId,
      updateAddressInputBodyDto,
    );
  }
}
