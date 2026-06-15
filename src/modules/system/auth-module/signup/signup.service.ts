import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSignupInputBodyDto } from './dto/input/create-signup-input-body.dto';
import { UsersService } from '../../user-module/users.service';
import { AccountService } from '../../account-module/account/account.service';
import { AccountUserService } from '../../account-module/account-user/account-user.service';
import { AuthService } from '../auth/auth.service';
import {
  AccountStatus,
  AccountUserStatus,
  AccountUserType,
  DocumentType,
} from '@prisma/client';
import { LoginAuthOutputDto } from '../auth/dto/output/login-auth-output.dto';

@Injectable()
export class SignupService {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountService: AccountService,
    private readonly accounUserService: AccountUserService,
    private readonly authService: AuthService,
  ) {}

  async create(
    createSignupInputBodyDto: CreateSignupInputBodyDto,
  ): Promise<LoginAuthOutputDto> {
    const user = await this.usersService.findOneEmail({
      email: createSignupInputBodyDto.email,
    });

    if (user) {
      throw new NotFoundException('User already exists');
    }

    const newAccount = await this.accountService.create({
      name: createSignupInputBodyDto.companyName,
      fantasyName: createSignupInputBodyDto.companyName,
      document: createSignupInputBodyDto.companyDocument,
      status: AccountStatus.ENABLED,
    });

    const newUser = await this.usersService.create({
      email: createSignupInputBodyDto.email,
      password: createSignupInputBodyDto.password,
      name: createSignupInputBodyDto.name,
      dateOfBirth: createSignupInputBodyDto.dateBirth,
    });

    await this.usersService.createUserDocument(
      {
        number: createSignupInputBodyDto.document,
        type: DocumentType.CPF,
      },
      newUser.id,
    );

    await this.accounUserService.create({
      accountId: newAccount.id,
      userId: newUser.id,
      position: 'Profissional',
      status: AccountUserStatus.ENABLED,
      type: AccountUserType.TEAM,
    });

    return await this.authService.login(
      createSignupInputBodyDto.email,
      createSignupInputBodyDto.password,
    );
  }
}
