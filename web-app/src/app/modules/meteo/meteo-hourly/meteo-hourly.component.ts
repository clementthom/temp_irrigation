import { Component, OnInit } from '@angular/core';
import { MeteodataService, MeteoHourly } from '../meteodata.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-meteo-hourly',
  templateUrl: './meteo-hourly.component.html',
})
export class MeteoHourlyComponent implements OnInit {
  meteoHourly?: MeteoHourly;

  constructor(private meteoService: MeteodataService) {}

  ngOnInit(): void {
    this.loadMeteoHourly();
  }

  loadMeteoHourly(): void {
    this.meteoService.getMeteoHourly().subscribe((data) => {
      this.meteoHourly = data;
    });
  }

  updateMeteoHourly(): void {
    this.meteoService.updateMeteoHourly().subscribe({
      next: () => {
        this.loadMeteoHourly(); // Rafraîchir les données après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour des données météo horaires :', err);
        alert('Une erreur est survenue lors de la mise à jour des données.');
      },
    });
  }

  formatDate(date: string | number): string {
    const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromMillis(date);
    return dt.isValid
      ? dt.setZone('Europe/Paris').setLocale('fr').toFormat('dd LLLL yyyy HH:mm:ss')
      : 'Date invalide';
  }
}
