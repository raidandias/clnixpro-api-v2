import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserOutputDto {
  @ApiProperty({ example: 'User was successfully deleted.' })
  message: string;
}
