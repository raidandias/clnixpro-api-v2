import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderProfessionalOutputDto } from './find-one-order-professional-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderProfessionalOutputDto {
  @ApiProperty({ type: [FindOneOrderProfessionalOutputDto] })
  data: FindOneOrderProfessionalOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
