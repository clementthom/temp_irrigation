import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { ArduinoService } from './arduino/arduino.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MesuresModule } from './mesures/mesures.module';
import { CommandModule } from './command/command.module';
import { ArduinoModule } from './arduino/arduino.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
