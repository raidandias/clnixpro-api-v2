import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderPaymentCurrencyOutputDto } from './find-one-order-payment-currency-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderPaymentCurrencyOutputDto {
  @ApiProperty({ type: [FindOneOrderPaymentCurrencyOutputDto] })
  data: FindOneOrderPaymentCurrencyOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
