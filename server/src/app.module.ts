import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { ArduinoService } from './arduino/arduino.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web-app/browser'),
      // serveRoot: '/static/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronService, ArduinoService],
})
export class AppModule {}
