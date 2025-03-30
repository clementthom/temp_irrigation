import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
export type Meteodata = {
  id: string;
  date: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class MeteodataService {

  constructor(
    private http: HttpClient
  ) { }

  getMeteoData(): Observable<Meteodata[]> {
    return this.http.get<Meteodata[]>('http://localhost:3000/meteo');
  }
}
