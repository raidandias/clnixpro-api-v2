import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { UsersService } from 'src/modules/system/user-module/users.service';
import { AccountUserService } from 'src/modules/system/account-module/account-user/account-user.service';
import { MailService } from 'src/share/service/mailgun/mail.service';
import { ConfigService } from '@nestjs/config';
import { AccountModule } from 'src/modules/system/account-module/account/account.module';
import { AccountUserModule } from 'src/modules/system/account-module/account-user/account-user.module';
import { UsersModule } from 'src/modules/system/user-module/users.module';

@Module({
  controllers: [ProfessionalController],
  providers: [
    ProfessionalService,
    PrismaService,
    UsersService,
    AccountUserService,
    MailService,
    ConfigService,
  ],
  exports: [ProfessionalService],
  imports: [UsersModule, AccountUserModule, AccountModule],
})
export class ProfessionalModule {}
