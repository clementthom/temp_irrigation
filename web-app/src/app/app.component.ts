import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MeteodataService, Meteodata } from './modules/meteo/meteodata.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Votre E-rrigation';
  list: Meteodata[] = [];
  constructor(
    private meteodataService: MeteodataService
  ) {
    this.meteodataService.getMeteoData().subscribe(data => this.list = data);
  }
}
