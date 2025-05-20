import { Component, OnInit } from '@angular/core';
import { MeteodataService, MeteoDaily } from '../meteodata.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-meteo-daily',
  templateUrl: './meteo-daily.component.html',
})
export class MeteoDailyComponent implements OnInit {
  meteoDaily?: MeteoDaily;

  constructor(private meteoService: MeteodataService) {}

  ngOnInit(): void {
    this.loadMeteoDaily();
  }

  loadMeteoDaily(): void {
    this.meteoService.getMeteoDaily().subscribe((data) => {
      this.meteoDaily = data;
    });
  }

  updateMeteoDaily(): void {
    this.meteoService.updateMeteoDaily().subscribe({
      next: () => {
        this.loadMeteoDaily(); // Rafraîchir les données après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour des données météo quotidiennes :', err);
        alert('Une erreur est survenue lors de la mise à jour des données.');
      },
    });
  }

  formatDate(date: string | number): string {
    const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromMillis(date);
    return dt.isValid ? dt.setLocale('fr').toFormat('dd LLLL yyyy HH:mm:ss') : 'Date invalide';
  }
}
