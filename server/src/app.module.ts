import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { ArduinoService } from './arduino/arduino.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MesuresModule } from './mesures/mesures.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web-app/browser'),
      // serveRoot: '/static/',
    }),
    MesuresModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService, ArduinoService],
})
export class AppModule {}
