export interface City {
    name: string;
    latitude: number;
    longitude: number;
    altitude: number;
    country?: string; // Pour les villes hors France métropolitaine
    city?: string;    // Pour les villes hors France métropolitaine
    insee?: string;   // Pour les villes françaises
    cp?: number;      // Pour les villes françaises
}
