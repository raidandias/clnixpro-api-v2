import { PartialType } from '@nestjs/swagger';
import { FindOneUserOutputDto } from './find-one-user-output.dto';

export class PhotoUserOutputDto extends PartialType(FindOneUserOutputDto) {}
