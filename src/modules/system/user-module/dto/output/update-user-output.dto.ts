import { PartialType } from '@nestjs/swagger';
import { FindOneUserOutputDto } from './find-one-user-output.dto';

export class UpdateUserOutputDto extends PartialType(FindOneUserOutputDto) {}
