import { City } from '../../meteo-concept/city.model';
import { HourlyForecast } from '../../meteo-concept/next.hours.model';
import { ApiProperty } from '@nestjs/swagger';

export class Forecast {
    @ApiProperty({ description: 'Date et heure de la prévision', example: '2023-03-30T12:00:00Z' })
    datetime: string;

    @ApiProperty({ description: 'Vent moyen à 10m au-dessus du sol (km/h)', example: 15 })
    wind10m: number;

    @ApiProperty({ description: 'Probabilité d\'observer du gel (%)', example: 0 })
    probafrost: number;

    @ApiProperty({ description: 'Code météo pour le temps sensible', example: 1 })
    weather: number;

    @ApiProperty({ description: 'Humidité relative moyenne à 2m du sol (%)', example: 80 })
    rh2m: number;

    @ApiProperty({ description: 'Cumul de pluie sur la période (mm)', example: 0 })
    rr10: number;

    @ApiProperty({ description: 'Cumul maximal de pluie attendu sur la période (mm)', example: 0 })
    rr1: number;

    constructor(forecast: Partial<Forecast>) {
        this.datetime = forecast.datetime || '';
        this.wind10m = forecast.wind10m || 0;
        this.probafrost = forecast.probafrost || 0;
        this.weather = forecast.weather || 0;
        this.rh2m = forecast.rh2m || 0;
        this.rr10 = forecast.rr10 || 0;
        this.rr1 = forecast.rr1 || 0;
    }
}

export class MeteoHourly {
    @ApiProperty({ description: 'Identifiant unique', example: '12345' })
    id: string; // Identifiant unique

    @ApiProperty({ description: 'Informations réduites sur la ville', type: () => Object, example: { name: 'Paris', cp: 75000 } })
    city: Pick<City, 'name' | 'cp'>;

    @ApiProperty({ description: 'Date et heure de mise à jour', example: '2023-03-30T12:34:56.789Z' })
    update: string; // Format date-time

    @ApiProperty({
        description: 'Prévisions horaires réduites',
        type: [Forecast], // Utilisation de la classe Forecast pour Swagger
        example: [
            {
                datetime: '2023-03-30T12:00:00Z',
                wind10m: 15,
                probafrost: 0,
                weather: 1,
                rh2m: 80,
                rr10: 0,
                rr1: 0,
            },
        ],
    })
    forecast: Forecast[];

    constructor(meteoHourly: Partial<MeteoHourly>) {
        this.id = meteoHourly.id || '';
        this.city = meteoHourly.city || { name: '', cp: 0 };
        this.update = meteoHourly.update || '';
        this.forecast = (meteoHourly.forecast || []).map((forecast) => new Forecast(forecast));
    }
}


