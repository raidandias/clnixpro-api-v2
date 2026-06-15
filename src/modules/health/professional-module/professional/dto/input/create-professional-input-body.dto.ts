import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfessionalInputBodyDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio' })
  @IsUUID(4, { message: 'O ID do usuário deve ser um UUID válido' })
  userId: string;

  @ApiProperty({
    description: 'The occupation of the professional',
    example: 'Doctor',
  })
  @IsNotEmpty({ message: 'A ocupação não pode estar vazia' })
  @IsString({ message: 'A ocupação deve ser uma string' })
  ocupation: string;

  @ApiProperty({
    description: 'The unique identifier of the account (optional)',
    example: '98765432-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'O ID da conta deve ser um UUID válido' })
  accountId?: string;
}
