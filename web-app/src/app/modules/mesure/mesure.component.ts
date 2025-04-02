import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mesure, MesureService } from './mesure.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mesure',
  templateUrl: './mesure.component.html',
  styleUrls: ['./mesure.component.scss'],
  imports: [FormsModule]
})
export class MesureComponent implements OnInit, OnDestroy {
  mesures: Mesure[] = [];
  newMesure: Partial<Mesure> = {
    temperature: 0,
    humidity1: 0,
    humidity2: 0,
    lightIntensity: 0,
    timestamp: new Date().toISOString()
  };
  interval!: ReturnType<typeof setInterval>;

  constructor(private mesureService: MesureService) {}

  ngOnInit(): void {
    this.loadMesures();
    // Charger les mesures toutes les 5 secondes
    this.interval = setInterval(() => this.loadMesures(), 5000); // Rafraîchir toutes les 10 secondes
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Charger toutes les mesures
  loadMesures(): void {
    this.mesureService.getMesures().subscribe((data) => {
      this.mesures = data;
    });
  }

  // Ajouter une nouvelle mesure
  addMesure(): void {
    this.mesureService.createMesure(this.newMesure as Omit<Mesure, 'id'>).subscribe(() => {
      this.loadMesures();
    });
  }

  // Supprimer une mesure
  deleteMesure(id: string): void {
    this.mesureService.deleteMesure(id).subscribe(() => {
      this.loadMesures();
    });
  }
}