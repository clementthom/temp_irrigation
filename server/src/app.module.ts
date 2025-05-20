import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MesuresModule } from './mesures/mesures.module';
import { CommandModule } from './command/command.module';
import { ArduinoModule } from './arduino/arduino.module';
import { MeteoDailyModule } from './meteo/meteo-daily/meteo-daily.module';
import { MeteoConceptService } from './meteo-concept/meteo-concept.service';
import { MeteoHourlyModule } from './meteo/meteo-hourly/meteo-hourly.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web-app/browser'),
      // serveRoot: '/static/',
    }),
    MesuresModule,
    CommandModule,
    ArduinoModule,
    MeteoDailyModule,
    MeteoHourlyModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService, MeteoConceptService],
})
export class AppModule {}
