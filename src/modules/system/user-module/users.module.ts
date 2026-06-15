import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth-module/auth/auth.module';
import { MailService } from 'src/share/service/mailgun/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService],
  imports: [forwardRef(() => AuthModule), ConfigModule],
  exports: [MailService],
})
export class UsersModule {}
