import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [StatementController],
  providers: [StatementService, PrismaService],
  exports: [StatementService],
})
export class StatementModule {}
