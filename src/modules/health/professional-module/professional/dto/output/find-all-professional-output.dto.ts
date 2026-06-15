import { ApiProperty } from '@nestjs/swagger';
import { Professional } from '@prisma/client';
import { PageInfo } from 'src/share/dto/output/page-info.dto';
import { FindOneProfessionalOutputDto } from './find-one-professional-output.dto';

export class FindAllProfessionalOutputDto {
  @ApiProperty({ type: [FindOneProfessionalOutputDto] })
  data: FindOneProfessionalOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
