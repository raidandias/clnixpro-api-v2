import { PartialType } from '@nestjs/swagger';
import { FindOneAccountUserOutputDto } from './find-one-account-user-output.dto';

export class UpdateAccountUserOutputDto extends PartialType(
  FindOneAccountUserOutputDto,
) {}
