import { Module } from '@nestjs/common';
import { MesuresController } from './mesures.controller';
import { MesuresService } from './mesures.service';

@Module({
  controllers: [MesuresController],
  providers: [MesuresService]
})
export class MesuresModule {}
