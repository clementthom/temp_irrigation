import { Controller, Get, Post } from '@nestjs/common';
import { MeteoHourlyService } from './meteo-hourly.service';
import { MeteoHourly } from './meteo-hourly.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('meteo-hourly')
@Controller('meteo-hourly')
export class MeteoHourlyController {
    constructor(private readonly meteoHourlyService: MeteoHourlyService) {}

    @Get()
    @ApiOperation({ summary: 'Récupérer la météo horaire' })
    @ApiResponse({ status: 200, description: 'Météo horaire.', type: MeteoHourly })
    async getMeteo(): Promise<MeteoHourly> {
        return this.meteoHourlyService.getMeteo();
    }

    @Post('load')
    @ApiOperation({ summary: 'Recharge  meteo-daily-periods depuis le serveur meteo concept' })
    @ApiResponse({ status: 200, description: 'La méeteo a été mise à jour.' })
    async loadDailyPeriods(): Promise<void> {
      await this.meteoHourlyService.load();
    }
}
