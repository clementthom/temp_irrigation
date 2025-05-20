import { Module } from '@nestjs/common';
import { MeteoHourlyService } from './meteo-hourly.service';
import { MeteoHourlyController } from './meteo-hourly.controller';
import { MeteoConceptService } from 'src/meteo-concept/meteo-concept.service';

@Module({
    controllers: [MeteoHourlyController],
    providers: [MeteoHourlyService, MeteoConceptService],
})
export class MeteoHourlyModule {}
