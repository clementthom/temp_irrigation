import { City } from '../../../meteo-concept/city.model';
import { HourlyForecast } from '../../../meteo-concept/next.hours.model';

export class CreateMeteoHourlyDto {
    city: Pick<City, 'name' | 'cp'>;
    update: string; // Format date-time
    forecast: Pick<HourlyForecast, 'datetime' | 'wind10m' | 'probafrost' | 'weather' | 'rh2m' | 'rr10' | 'rr1'>[];
}
