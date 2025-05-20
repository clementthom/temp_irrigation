import { City } from './city.model';

export interface HourlyForecast {
    datetime: string; // Format date-time
    temp2m: number;   // Température à 2m du sol en °C
    rh2m: number;     // Humidité relative à 2m du sol en %
    wind10m: number;  // Vent moyen à 10m au-dessus du sol en km/h
    gust10m: number;  // Rafales de vent maximales à 10m au-dessus du sol en km/h
    dirwind10m: number; // Direction du vent moyen en degrés
    rr10: number;     // Cumul de pluie sur 10 minutes en mm
    rr1: number;      // Cumul de pluie maximal attendu sur 1 heure en mm
    weather: number;  // Code-temps pour le temps sensible général
    probafrost: number; // Probabilité d'observer du gel en %
    probafog: number;   // Probabilité d'observer du brouillard en %
    probawind70: number; // Probabilité d'observer un coup de vent (>70km/h) en %
    probawind100: number; // Probabilité d'observer une tempête (>100km/h) en %
    isday: number;       // Indicateur jour/nuit (1 : jour, 0 : nuit)
}

export interface NextHours {
    city: City;
    update: string; // Format date-time
    forecast: HourlyForecast[];
}
