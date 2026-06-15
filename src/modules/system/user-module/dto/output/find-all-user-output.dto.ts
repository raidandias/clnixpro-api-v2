import { ApiProperty } from '@nestjs/swagger';
import { FindOneUserOutputDto } from './find-one-user-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllUsersOutputDto {
  @ApiProperty({ type: [FindOneUserOutputDto] })
  data: FindOneUserOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
