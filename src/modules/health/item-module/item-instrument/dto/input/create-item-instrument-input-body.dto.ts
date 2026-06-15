import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemInstrumentInputBodyDto {
  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the item instrument',
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  @IsOptional()
  accountId: string;

  @ApiProperty({
    example: 'edc5f7b4-8d8f-4c4c-8d7b-1e8f7d9b03d3',
    description: 'The item ID associated with the item instrument',
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item Product ID associated with the item instrument',
  })
  @IsString({ message: 'Item Product ID must be a string.' })
  @IsUUID(4, { message: 'Item Product ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item Product ID is required.' })
  itemCatalogProductId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item Service ID associated with the item instrument',
  })
  @IsString({ message: 'Item Service ID must be a string.' })
  @IsUUID(4, { message: 'Item Service ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item Service ID is required.' })
  itemCatalogServiceId: string;
}

export class CreateItemInstrumentInputBodyArrayDto {
  @ApiProperty({ type: [CreateItemInstrumentInputBodyDto] })
  data: CreateItemInstrumentInputBodyDto[];
}
