import { Module } from '@nestjs/common';
import { ProfessionalItemController } from './professional-item.controller';
import { ProfessionalItemService } from './professional-item.service';

@Module({
  controllers: [ProfessionalItemController],
  providers: [ProfessionalItemService],
  exports: [ProfessionalItemService],
})
export class ProfessionalItemModule {}
