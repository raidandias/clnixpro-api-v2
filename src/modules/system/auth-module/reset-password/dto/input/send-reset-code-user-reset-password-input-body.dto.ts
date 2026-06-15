import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SendResetCodeUserResetPasswordInputBodyDto {
  @ApiProperty({
    example: 'jonh@example.com',
    description: 'Email for send token reset request.',
  })
  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email: string;
}
