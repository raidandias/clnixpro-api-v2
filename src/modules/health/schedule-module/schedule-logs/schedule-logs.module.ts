import { Module } from '@nestjs/common';
import { ScheduleLogsService } from './schedule-logs.service';
import { ScheduleLogsController } from './schedule-logs.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [ScheduleLogsController],
  providers: [ScheduleLogsService, PrismaService],
  exports: [ScheduleLogsService],
})
export class ScheduleLogsModule {}
