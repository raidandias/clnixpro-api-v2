import { ApiProperty } from '@nestjs/swagger';
import { FindOneAccountUserOutputDto } from './find-one-account-user-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllAccountUserOutputDto {
  @ApiProperty({ type: [FindOneAccountUserOutputDto] })
  data: FindOneAccountUserOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
