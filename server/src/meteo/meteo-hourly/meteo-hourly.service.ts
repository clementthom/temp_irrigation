import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MeteoHourly } from './meteo-hourly.entity';
import { CreateMeteoHourlyDto } from './dto/create-meteo-hourly.dto';
import { UpdateMeteoHourlyDto } from './dto/update-meteo-hourly.dto';
import { MeteoConceptService } from 'src/meteo-concept/meteo-concept.service';

@Injectable()
export class MeteoHourlyService {
    private readonly apiUrl = 'http://localhost:3000/meteo-hourly'; // URL du serveur JSON
    
    constructor(private readonly mteoConceptService: MeteoConceptService) {}

    async getMeteo(): Promise<MeteoHourly> {
        const response = await axios.get<MeteoHourly>(this.apiUrl);
        return response.data;
    }

    async load(): Promise<void> {
        this.mteoConceptService.getNextHours("17300", false, true).catch((error) => {
            console.error("Error fetching meteo data:", error);
        });
    }
}
