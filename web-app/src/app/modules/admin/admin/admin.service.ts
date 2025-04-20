import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api'; // URL de l'API NestJS/admin'; 
  constructor(private http: HttpClient) { }

  // Ajouter une méthode pour appeler l'endpoint clear sur le JSON-server
  clearMesures(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mesures/clear`, null);
  }

  // Ajouter une méthode pour appeler lancer une commande sur l'arduino
  commandVanne(vanne: number, action: 'open' | 'close') {
    return this.http.post<void>(`${this.apiUrl}/command/command-vanne/${vanne}`, {action});
  }
}
