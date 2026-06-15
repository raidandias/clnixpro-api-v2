import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderPaymentOutputDto } from './find-one-order-payment-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderPaymentOutputDto {
  @ApiProperty({ type: [FindOneOrderPaymentOutputDto] })
  data: FindOneOrderPaymentOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
