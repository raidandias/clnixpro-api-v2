import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateProfessionalWithUserInputBodyDto {
  // Professional Data
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

  // User Data
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser um endereço válido' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongP@ssw0rd',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número ou caractere especial',
  })
  password: string;

  @ApiProperty({
    description: 'URL of the user profile photo',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A foto deve ser uma string' })
  photo?: string;

  @ApiProperty({
    description: 'Country code for phone number',
    example: '+55',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O código do país deve ser uma string' })
  countryCodePhone?: string;

  @ApiProperty({
    description: 'Area code for phone number',
    example: '11',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O código de área deve ser uma string' })
  areaCodePhone?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '999999999',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O número de telefone deve ser uma string' })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A data de nascimento deve ser uma string' })
  dateOfBirth?: string;
}
