import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoDailyComponent } from './meteo-daily/meteo-daily.component';
import { MeteoHourlyComponent } from './meteo-hourly/meteo-hourly.component';

@NgModule({
  declarations: [MeteoDailyComponent, MeteoHourlyComponent],
  imports: [CommonModule],
  exports: [MeteoDailyComponent, MeteoHourlyComponent],
})
export class MeteoModule {}
