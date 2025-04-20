import { Injectable } from '@nestjs/common';
import { ArduinoService } from '../arduino/arduino.service'; // Importer ArduinoService
import { CommandVannePayload } from './command.controller'; // Importer l'interface CommandVannePayload


@Injectable()
export class CommandService {
  constructor(private readonly arduinoService: ArduinoService) {}

  async commmandVanne(vanne: string, action: string): Promise<void> {
    try {
      this.arduinoService.sendData(JSON.stringify({ vanne: {[vanne]: action} }));
      console.log('Commande envoyée : Vanne 1 activée.');
    } catch (error) {
      console.error('Erreur lors de l\'activation de la vanne 1 :', error.message);
      throw error;
    }
  }
} 
