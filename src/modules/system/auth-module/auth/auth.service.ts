import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../user-module/users.service';
import { FindOneEmailUserOutputDto } from '../../user-module/dto/output/find-one-email-user-output.dto';
import { LoginAuthOutputDto } from './dto/output/login-auth-output.dto';
import * as bcrypt from 'bcrypt';
import { AccountUserService } from '../../account-module/account-user/account-user.service';
import { FindAllAccountUserInputQueryDto } from '../../account-module/account-user/dto/input/find-all-account-user-input-query.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountUserService: AccountUserService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginAuthOutputDto> {
    const user = await this.usersService.findOneEmail({ email: email });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return await this.generateJwt(user);
  }

  async refresh(
    refreshToken: string,
    accountId?: string,
  ): Promise<LoginAuthOutputDto> {
    const payload = this.jwtService.verify(refreshToken);

    const newPayload = {
      user: {
        id: payload.user.id,
        email: payload.user.email,
        name: payload.user.name,
        photo: payload.user.photo,
      },
      account: payload.account ? { id: payload.account.id } : null,
      sub: payload.user.id,
    };

    if (accountId) {
      // Verifica se o usuário pode acessar a nova conta
      const accountUser = await this.accountUserService.findOneAccount({
        userId: payload.user.id,
        accountId: accountId,
      } as FindAllAccountUserInputQueryDto);

      if (!accountUser) {
        throw new UnauthorizedException(
          'User not associated with the provided account',
        );
      }

      newPayload.account = { id: accountId };
    } else if (!newPayload.account) {
      // Verifica se o usuário pode acessar a conta no payload se accountId não for fornecido
      const accountUser = await this.accountUserService.findOneAccount({
        userId: payload.user.id,
      } as FindAllAccountUserInputQueryDto);

      if (!accountUser) {
        throw new UnauthorizedException('User not associated with any account');
      }

      newPayload.account = { id: accountUser.accountId };
    }

    return {
      access_token: this.jwtService.sign(newPayload),
      refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
    };
  }

  private async generateJwt(
    user: FindOneEmailUserOutputDto,
    accountId: string = null,
  ): Promise<LoginAuthOutputDto> {
    let accountUser;

    // Verificação do accountId
    if (accountId) {
      accountUser = await this.accountUserService.findOneAccount({
        userId: user.id,
        accountId: accountId,
      } as FindAllAccountUserInputQueryDto);

      if (!accountUser) {
        throw new UnauthorizedException('User not associated with account');
      }
    } else {
      accountUser = await this.accountUserService.findOneAccount({
        userId: user.id,
      } as FindAllAccountUserInputQueryDto);

      if (!accountUser) {
        throw new UnauthorizedException('User not associated with account');
      }

      accountId = accountUser.accountId;
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo,
      },
      account: {
        id: accountId,
      },
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
