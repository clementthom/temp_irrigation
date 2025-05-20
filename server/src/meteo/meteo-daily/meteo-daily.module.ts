import { Module } from '@nestjs/common';
import { MeteoDailyService } from './meteo-daily.service';
import { MeteoDailyController } from './meteo-daily.controller';
import { MeteoConceptService } from 'src/meteo-concept/meteo-concept.service';

@Module({
    controllers: [MeteoDailyController],
    providers: [MeteoDailyService, MeteoConceptService],
})
export class MeteoDailyModule {}
