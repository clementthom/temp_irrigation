import { Routes } from '@angular/router';
import { MesureComponent } from './modules/mesure/mesure.component';
import { AdminComponent } from './modules/admin/admin/admin.component';

export const routes: Routes = [
  { path: 'mesures', component: MesureComponent }, // Route pour le composant Mesure
  { path: 'admin', component: AdminComponent },   // Route pour le composant Admin
  { path: '', redirectTo: '/mesures', pathMatch: 'full' } // Redirection par défaut vers /mesures
];
