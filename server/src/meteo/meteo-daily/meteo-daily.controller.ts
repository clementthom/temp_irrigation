import { Controller, Get, Post } from '@nestjs/common';
import { MeteoDailyService } from './meteo-daily.service';
import { MeteoDaily } from './meteo-daily.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('meteo-daily')
@Controller('meteo-daily')
export class MeteoDailyController {
    constructor(private readonly meteoDailyService: MeteoDailyService) {}

    @Get()
    @ApiOperation({ summary: 'Récupérer la météo quotidienne' })
    @ApiResponse({ status: 200, description: 'Liste des données météo quotidiennes.', type: [MeteoDaily] })
    async getMeteo(): Promise<MeteoDaily> {
        return this.meteoDailyService.getMeteo();
    }

    @Post('load')
    @ApiOperation({ summary: 'Recharger les données météo quotidiennes depuis le serveur Meteo Concept' })
    @ApiResponse({ status: 200, description: 'Les données météo quotidiennes ont été mises à jour.' })
    async loadDailyPeriods(): Promise<void> {
        await this.meteoDailyService.load();
    }
}
