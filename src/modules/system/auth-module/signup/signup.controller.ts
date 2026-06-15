import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SignupService } from './signup.service';
import { CreateSignupInputBodyDto } from './dto/input/create-signup-input-body.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { LoginAuthOutputDto } from '../auth/dto/output/login-auth-output.dto';

@ApiTags('API Signup')
@Controller('api/signup')
@UseFilters(HttpExceptionFilter)
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new Signup' })
  @ApiResponse({
    status: 200,
    description: 'The Signup has been successfully created.',
    type: LoginAuthOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createSignupInputBodyDto: CreateSignupInputBodyDto,
  ): Promise<LoginAuthOutputDto> {
    return await this.signupService.create(createSignupInputBodyDto);
  }
}
