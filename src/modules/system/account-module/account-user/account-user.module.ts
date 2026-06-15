import { forwardRef, Module } from '@nestjs/common';
import { AccountUserService } from './account-user.service';
import { AccountUserController } from './account-user.controller';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';
import { UsersModule } from '../../user-module/users.module';
import { UsersService } from '../../user-module/users.service';
import { AuthModule } from '../../auth-module/auth/auth.module';
import { PrismaModule } from 'src/share/service/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => AccountModule),
    forwardRef(() => UsersModule),
  ],
  providers: [AccountUserService, AccountService, UsersService],
  controllers: [AccountUserController],
  exports: [AccountUserService],
})
export class AccountUserModule {}
