import { ApiProperty } from '@nestjs/swagger';

export class SendResetCodeUserResetPasswordOutputDto {
  @ApiProperty({
    example: 'Message the email send for addres',
    description: 'Message the email send for addres',
  })
  message: string;

  @ApiProperty({
    example: 'true',
    description: 'Code send success',
  })
  status: boolean;
}
