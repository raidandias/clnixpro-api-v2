import { ApiProperty } from '@nestjs/swagger';
import { FindOneScheduleParticipantOutputDto } from './find-one-schedule-participant-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllScheduleParticipantOutputDto {
  @ApiProperty({ type: [FindOneScheduleParticipantOutputDto], description: 'List of schedule participants' })
  data: FindOneScheduleParticipantOutputDto[];

  @ApiProperty({ description: 'Pagination information' })
  pageInfo: PageInfo;
}
