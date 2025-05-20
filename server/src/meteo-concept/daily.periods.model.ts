import { City } from './city.model';

export interface LandQuarterOfDayForecast {
    latitude: number;
    longitude: number;
    datetime: string; // Format date-time
    wind10m: number;
    gust10m: number;
    dirwind10m: number;
    weather: number;
    probafrost: number;
    probafog: number;
    probawind70: number;
    probawind100: number;
    day: number; // 0 à 13
    period: number; // 0 à 3
    temp2m: number;
    rh2m: number;
    rr10: number;
    rr1: number;
    gustx: number;
    country?: string; // Pour les villes hors France métropolitaine
    city?: string;    // Pour les villes hors France métropolitaine
    insee?: string;   // Pour les villes françaises
    cp?: number;      // Pour les villes françaises
}

export interface DailyPeriod {
    city: City;
    update: string; // Format date-time
    forecast: LandQuarterOfDayForecast[][];
}
