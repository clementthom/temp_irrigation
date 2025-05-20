import { Routes } from '@angular/router';
import { MesureComponent } from './modules/mesure/mesure.component';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { MeteoDailyComponent } from './modules/meteo/meteo-daily/meteo-daily.component';
import { MeteoHourlyComponent } from './modules/meteo/meteo-hourly/meteo-hourly.component';

export const routes: Routes = [
  { path: 'mesures', component: MesureComponent }, // Route pour le composant Mesure
  { path: 'admin', component: AdminComponent },   // Route pour le composant Admin
  { path: 'meteo-daily', component: MeteoDailyComponent }, // Route pour le composant MeteoDaily
  { path: 'meteo-hourly', component: MeteoHourlyComponent }, // Route pour le composant MeteoHourly
  { path: '', redirectTo: '/mesures', pathMatch: 'full' } // Redirection par défaut vers /mesures
];
