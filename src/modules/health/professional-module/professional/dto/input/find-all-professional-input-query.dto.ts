import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllProfessionalInputQueryDto {
  @ApiProperty({
    required: false,
    description: 'The unique identifier of the account',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'O ID da conta deve ser um UUID válido' })
  accountId?: string;

  @ApiProperty({
    required: false,
    description: 'The occupation of the professional',
    example: 'Doctor',
  })
  @IsOptional()
  @IsString({ message: 'A ocupação deve ser uma string' })
  ocupation?: string;

  @ApiProperty({
    required: false,
    description: 'Filter professionals by user name',
    example: 'John',
  })
  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser uma string' })
  userName?: string;

  @ApiProperty({
    required: false,
    description: 'The page number for pagination',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A página deve ser um número' })
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @ApiProperty({
    required: false,
    description: 'The number of items per page',
    example: 10,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O número de itens por página deve ser um número' })
  @Transform(({ value }) => parseInt(value, 10))
  perPage?: number;
}
