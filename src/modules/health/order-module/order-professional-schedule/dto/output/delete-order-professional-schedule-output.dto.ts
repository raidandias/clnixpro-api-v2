import { ApiProperty } from '@nestjs/swagger';

export class DeleteOrderProfessionalScheduleOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order professional schedule.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order professional schedule.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order professional schedule.',
  })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order professional associated with this schedule.',
  })
  orderProfessionalId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The schedule associated with this order professional schedule.',
    nullable: true,
  })
  sheduleId: string | null;

  @ApiProperty({
    example: '2024-01-15T09:00:00Z',
    description: 'The start date and time of the schedule.',
  })
  startAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the schedule.',
  })
  endAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was soft deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
