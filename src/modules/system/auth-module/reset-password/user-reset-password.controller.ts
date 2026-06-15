import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserResetPasswordService } from './user-reset-password.service';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { VerifyResetCodeUserResetPasswordOutputDto } from './dto/output/verify-reset-code-user-reset-password-output.dto';
import { VerifyResetCodelUserResetPasswordInputBodyDto } from './dto/input/verify-reset-code-user-reset-password-input-body.dto';
import { ChangePasswordUserResetPasswordOutputDto } from './dto/output/change-password-user-reset-password-output.dto';
import { ChangePasswordUserResetPasswordInputBodyDto } from './dto/input/change-password-user-reset-password-input-body.dto';
import { SendResetCodeUserResetPasswordInputBodyDto } from './dto/input/send-reset-code-user-reset-password-input-body.dto';
import { SendResetCodeUserResetPasswordOutputDto } from './dto/output/send-reset-code-user-reset-password-output.dto';

@ApiTags('API User Reset Password')
@Controller('api/user-reset-password')
@UseFilters(HttpExceptionFilter)
export class UserResetPasswordController {
  constructor(
    private readonly userResetPasswordService: UserResetPasswordService,
  ) {}

  @Post('/v1/send-reset-code')
  @ApiOperation({ summary: 'Create a new UserResetPassword' })
  @ApiResponse({
    status: 200,
    description: 'The UserResetPassword has been successfully created.',
    type: SendResetCodeUserResetPasswordOutputDto,
  })
  @ApiCommonResponses()
  async sendResetCode(
    @Body()
    sendResetCodeUserResetPasswordInputBodyDto: SendResetCodeUserResetPasswordInputBodyDto,
  ): Promise<SendResetCodeUserResetPasswordOutputDto> {
    return await this.userResetPasswordService.sendResetCode(
      sendResetCodeUserResetPasswordInputBodyDto,
    );
  }

  @Post('/v1/verify-reset-code')
  @ApiOperation({ summary: 'Verify Code' })
  @ApiResponse({
    status: 200,
    description: 'The UserResetPassword has been successfully created.',
    type: VerifyResetCodeUserResetPasswordOutputDto,
  })
  @ApiCommonResponses()
  async verifyResetCode(
    @Body()
    verifyResetCodelUserResetPasswordInputBodyDto: VerifyResetCodelUserResetPasswordInputBodyDto,
  ): Promise<VerifyResetCodeUserResetPasswordOutputDto> {
    return await this.userResetPasswordService.verifyResetCode(
      verifyResetCodelUserResetPasswordInputBodyDto,
    );
  }

  @Post('/v1/change-password')
  @ApiOperation({ summary: 'Change password user' })
  @ApiResponse({
    status: 200,
    description: 'The UserResetPassword has been successfully created.',
    type: ChangePasswordUserResetPasswordOutputDto,
  })
  @ApiCommonResponses()
  async changePassword(
    @Body()
    changePasswordUserResetPasswordInputBodyDto: ChangePasswordUserResetPasswordInputBodyDto,
  ): Promise<ChangePasswordUserResetPasswordOutputDto> {
    return await this.userResetPasswordService.changePassword(
      changePasswordUserResetPasswordInputBodyDto,
    );
  }
}
