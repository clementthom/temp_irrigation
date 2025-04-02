import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mesure {
  id: string;
  temperature: number;
  humidity1: number;
  humidity2: number;
  lightIntensity: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class MesureService {
  private apiUrl = '/api/mesures'; // URL de l'API NestJS

  constructor(private http: HttpClient) {}

  // Récupérer toutes les mesures
  getMesures(): Observable<Mesure[]> {
    return this.http.get<Mesure[]>(this.apiUrl);
  }

  // Récupérer une mesure par ID
  getMesureById(id: string): Observable<Mesure> {
    return this.http.get<Mesure>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle mesure
  createMesure(mesure: Omit<Mesure, 'id'>): Observable<Mesure> {
    return this.http.post<Mesure>(this.apiUrl, mesure);
  }

  // Mettre à jour une mesure
  updateMesure(id: string, mesure: Partial<Mesure>): Observable<Mesure> {
    return this.http.patch<Mesure>(`${this.apiUrl}/${id}`, mesure);
  }

  // Supprimer une mesure
  deleteMesure(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
