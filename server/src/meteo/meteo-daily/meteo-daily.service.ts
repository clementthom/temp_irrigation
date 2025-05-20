import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MeteoDaily } from './meteo-daily.entity';
import { CreateMeteoDailyDto } from './dto/create-meteo-daily.dto';
import { UpdateMeteoDailyDto } from './dto/update-meteo-daily.dto';
import { MeteoConceptService } from 'src/meteo-concept/meteo-concept.service';

@Injectable()
export class MeteoDailyService {
    private readonly apiUrl = 'http://localhost:3000/meteo-daily'; // URL du serveur JSON

    constructor(private readonly mteoConceptService: MeteoConceptService) {}

    async getMeteo(): Promise<MeteoDaily> {
        const response = await axios.get<MeteoDaily>(this.apiUrl);
        return response.data;
    }

    async load(): Promise<void> {
        this.mteoConceptService.getDailyPeriods("17300", false, 0, 7).catch((error) => {
            console.error("Error fetching meteo data:", error);
        });
    }
}
