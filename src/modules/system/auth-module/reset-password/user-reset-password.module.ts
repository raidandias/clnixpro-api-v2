import { Module } from '@nestjs/common';
import { UserResetPasswordService } from './user-reset-password.service';
import { UserResetPasswordController } from './user-reset-password.controller';
import { UsersModule } from '../../user-module/users.module';
import { UsersService } from '../../user-module/users.service';

@Module({
  controllers: [UserResetPasswordController],
  providers: [UserResetPasswordService, UsersService],
  imports: [UsersModule],
})
export class UserResetPasswordModule {}
