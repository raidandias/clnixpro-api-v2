import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { LoginAuthInputBodyDto } from './dto/input/login-auth-input.dto';
import { LoginAuthOutputDto } from './dto/output/login-auth-output.dto';
import { RefreshAuthOutputDto } from './dto/output/refresh-auth-output.dto';
import { RefreshAuthInputBodyDto } from './dto/input/refresh-auth-input.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/login')
  @ApiOperation({ summary: 'Login for user' })
  @ApiOkResponse({
    description: 'The user has been successfully login.',
    type: LoginAuthOutputDto,
  })
  @ApiCommonResponses()
  async login(
    @Body() loginAuthInputBodyDto: LoginAuthInputBodyDto,
  ): Promise<LoginAuthOutputDto> {
    return this.authService.login(
      loginAuthInputBodyDto.email,
      loginAuthInputBodyDto.password,
    );
  }

  @Post('/v1/refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Refresh token for user' })
  @ApiOkResponse({
    description: 'The refresh has been successfully created.',
    type: LoginAuthOutputDto,
  })
  @ApiCommonResponses()
  async refresh(
    @Body() refreshAuthInputBodyDto: RefreshAuthInputBodyDto,
  ): Promise<RefreshAuthOutputDto> {
    return this.authService.refresh(
      refreshAuthInputBodyDto.refresh_token,
      refreshAuthInputBodyDto.accountId,
    );
  }
}
