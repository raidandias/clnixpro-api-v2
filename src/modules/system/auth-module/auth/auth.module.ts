import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../user-module/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../../user-module/users.service';
import { AccountUserModule } from '../../account-module/account-user/account-user.module';
import { AccountUserService } from '../../account-module/account-user/account-user.service';
import { AccountModule } from '../../account-module/account/account.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AccountUserModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AccountModule), // Use forwardRef para AccountModule
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    AccountUserService,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService, AccountUserService],
})
export class AuthModule {}
