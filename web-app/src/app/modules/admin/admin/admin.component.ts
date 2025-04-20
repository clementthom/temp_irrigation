import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private adminService: AdminService) {}

  // Méthode pour appeler la fonction clear
  clearMesures(): void {
    this.adminService.clearMesures().subscribe({
      next: () => {
        alert('Toutes les mesures ont été supprimées avec succès.');
      },
      error: (err: Error) => {
        console.error('Erreur lors de la suppression des mesures :', err);
        alert('Une erreur est survenue lors de la suppression des mesures.');
      }
    });
  }

    // Méthode pour appeler la fonction clear
    commandVanne(vanne: number, action: 'open' | 'close'): void {
      this.adminService.commandVanne(vanne, action).subscribe({
        next: () => {
          console.log(`Vanne ${vanne} ${action}.`);
        },
        error: (err: Error) => {
          console.error('Erreur lors de l\'activationde la vanne:', err);
          alert('Erreur lors de l\'activationde la vanne');
        }
      });
    }
}
