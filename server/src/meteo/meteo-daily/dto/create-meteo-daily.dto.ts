import { City } from '../../../meteo-concept/city.model';
import { LandQuarterOfDayForecast } from '../../../meteo-concept/daily.periods.model';

export class CreateMeteoDailyDto {
    city: City;
    update: string; // Format date-time
    forecast: LandQuarterOfDayForecast[][];
}
