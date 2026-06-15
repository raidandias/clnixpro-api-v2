import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindOneEmailUserInputParamDto {
  @ApiProperty({
    example: 'john@exemplo.com',
  })
  @IsString({ message: 'The Email field must be a string' })
  @IsNotEmpty({ message: 'The Email field must not be empty' })
  @IsEmail({}, { message: 'The Email field must be a valid' })
  email: string;
}
