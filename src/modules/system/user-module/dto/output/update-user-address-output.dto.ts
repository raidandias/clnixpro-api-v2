import { PartialType } from '@nestjs/swagger';
import { CreateAddressInputBodyDto } from '../input/create-user-address-input.dto';

export class UpdateUserAddressOutputDto extends PartialType(
  CreateAddressInputBodyDto,
) {}
