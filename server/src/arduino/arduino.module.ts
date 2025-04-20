import { Module } from '@nestjs/common';
import { ArduinoService } from './arduino.service';

@Module({
  providers: [ArduinoService],
  exports: [ArduinoService], // Exporter le service pour qu'il soit utilisé dans d'autres modules
})
export class ArduinoModule {}