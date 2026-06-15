import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneProfessionalInputParamDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the professional',
  })
  @IsNotEmpty({ message: 'O ID do profissional não pode estar vazio' })
  @IsUUID(4, { message: 'O ID do profissional deve ser um UUID válido' })
  id: string;
}
