import { Component } from '@angular/core';
import { Meteodata, MeteodataService } from '../meteodata.service';

@Component({
  selector: 'app-meteodata',
  imports: [],
  templateUrl: './meteodata.component.html',
  styleUrl: './meteodata.component.scss'
})
export class MeteodataComponent {
  list: Meteodata[] = [];
    constructor(
      private meteodataService: MeteodataService
    ) {
      this.meteodataService.getMeteoData().subscribe(data => this.list = data);
    }
}
