import { PartialType } from '@nestjs/swagger';
import { FindOneAccountOutputDto } from './find-one-account-output.dto';

export class UpdateAccountOutputDto extends PartialType(
  FindOneAccountOutputDto,
) {}
