import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProfessionalInputParamDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the professional to be updated',
  })
  @IsNotEmpty({ message: 'O ID do profissional não pode estar vazio' })
  @IsUUID(4, { message: 'O ID do profissional deve ser um UUID válido' })
  id: string;
}

export class UpdateProfessionalInputBodyDto {
  @ApiProperty({
    required: false,
    example: 'Doctor',
    description: 'The updated occupation of the professional',
  })
  @IsOptional()
  @IsString({ message: 'A ocupação deve ser uma string' })
  ocupation?: string;
}
