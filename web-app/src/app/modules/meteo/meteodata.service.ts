import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

export type MeteoHourly = {
  id: string;
  city: { name: string; cp: number };
  update: string;
  forecast: {
    datetime: string;
    wind10m: number;
    probafrost: number;
    weather: number;
    rh2m: number;
    rr10: number;
    rr1: number;
  }[];
};

export type MeteoDaily = {
  id: string;
  city: { name: string; cp: number };
  update: string;
  forecast: {
    datetime: string;
    wind10m: number;
    probafrost: number;
    weather: number;
    rh2m: number;
    rr10: number;
    rr1: number;
  }[][];
};

@Injectable({
  providedIn: 'root',
})
export class MeteodataService {
  constructor(private http: HttpClient) {}

  getMeteoHourly(): Observable<MeteoHourly> {
    return this.http.get<MeteoHourly>('/api/meteo-hourly');
  }

  getMeteoDaily(): Observable<MeteoDaily> {
    return this.http.get<MeteoDaily>('/api/meteo-daily');
  }

  updateMeteoHourly(): Observable<MeteoHourly> {
    return this.http.post<void>('/api/meteo-hourly/load', {})
      .pipe(switchMap(() => this.getMeteoHourly()));
  }

  updateMeteoDaily(): Observable<MeteoDaily> {
    return this.http.post<void>('/api/meteo-daily/load', {})
        .pipe(switchMap(() => this.getMeteoDaily()));
  }
}
