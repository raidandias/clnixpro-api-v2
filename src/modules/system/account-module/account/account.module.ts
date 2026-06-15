import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [],
  exports: [AccountService],
})
export class AccountModule {}
