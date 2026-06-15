import { ApiProperty } from '@nestjs/swagger';
import { FindOneFileOutputDto } from './find-one-file-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllFileOutputDto {
  @ApiProperty({ type: [FindOneFileOutputDto] })
  data: FindOneFileOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
