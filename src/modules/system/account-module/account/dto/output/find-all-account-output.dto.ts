import { ApiProperty } from '@nestjs/swagger';
import { FindOneAccountOutputDto } from './find-one-account-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllAccountOutputDto {
  @ApiProperty({ type: [FindOneAccountOutputDto] })
  data: FindOneAccountOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
