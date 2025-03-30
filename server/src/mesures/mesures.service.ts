import { Injectable } from '@nestjs/common';
import { Mesure } from './mesure.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MesuresService {
  private mesures: Mesure[] = [];

  create(mesure: Omit<Mesure, 'id'>): Mesure {
    const newMesure = { id: uuidv4(), ...mesure };
    this.mesures.push(newMesure);
    return newMesure;
  }

  findAll(): Mesure[] {
    return this.mesures;
  }

  findOne(id: string): Mesure | undefined {
    return this.mesures.find((mesure) => mesure.id === id);
  }

  update(id: string, updatedMesure: Partial<Mesure>): Mesure | undefined {
    const mesureIndex = this.mesures.findIndex((mesure) => mesure.id === id);
    if (mesureIndex === -1) return undefined;

    this.mesures[mesureIndex] = { ...this.mesures[mesureIndex], ...updatedMesure };
    return this.mesures[mesureIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.mesures.length;
    this.mesures = this.mesures.filter((mesure) => mesure.id !== id);
    return this.mesures.length < initialLength;
  }
}
