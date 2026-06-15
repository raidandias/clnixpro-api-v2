import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllPatientInputQueryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Filtrar por ID do paciente',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Filtrar por ID do usuário associado',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  userId?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Injetado pelo AccountInterceptor',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId?: string;

  @ApiProperty({
    example: 1,
    description: 'Número da página',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Page must be an integer.' })
  page?: number;

  @ApiProperty({
    example: 20,
    description: 'Itens por página',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Per page must be an integer.' })
  perPage?: number;
}
