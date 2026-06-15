import { Module } from '@nestjs/common';
import { ScheduleParticipantService } from './schedule-participant.service';
import { ScheduleParticipantController } from './schedule-participant.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [ScheduleParticipantController],
  providers: [ScheduleParticipantService, PrismaService],
  exports: [ScheduleParticipantService],
})
export class ScheduleParticipantModule {}
