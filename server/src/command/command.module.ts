import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { ArduinoModule } from '../arduino/arduino.module'; // Importer ArduinoModule
import { CommandController } from './command.controller';

@Module({
  imports: [ArduinoModule], // Importer ArduinoModule ici
  providers: [CommandService],
  controllers: [CommandController],
})
export class CommandModule {}
