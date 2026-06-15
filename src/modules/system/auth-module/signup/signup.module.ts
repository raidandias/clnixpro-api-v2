import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { UsersModule } from '../../user-module/users.module';
import { AccountModule } from '../../account-module/account/account.module';
import { AccountUserModule } from '../../account-module/account-user/account-user.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../../user-module/users.service';
import { AuthModule } from '../auth/auth.module';
import { AccountService } from '../../account-module/account/account.service';
import { AccountUserService } from '../../account-module/account-user/account-user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SignupController],
  providers: [
    SignupService,
    UsersService,
    AccountService,
    AccountUserService,
    AuthService,
  ],
  imports: [
    UsersModule,
    AccountModule,
    AccountUserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Deveria ser armazenado em variáveis de ambiente
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class SignupModule {}
