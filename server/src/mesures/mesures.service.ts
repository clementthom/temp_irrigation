import { Injectable } from '@nestjs/common';
import { Mesure } from './mesure.entity';
import axios from 'axios';

@Injectable()
export class MesuresService {
  private readonly apiUrl = 'http://localhost:3000/mesures'; // URL du serveur JSON

  // Créer une nouvelle mesure
  async create(mesure: Omit<Mesure, 'id'>): Promise<Mesure> {
    try {
      const response = await axios.post<Mesure>(this.apiUrl, mesure);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la mesure :', error.message);
      throw error;
    }
  }

  // Récupérer toutes les mesures
  async findAll(): Promise<Mesure[]> {
    try {
      const response = await axios.get<Mesure[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des mesures :', error.message);
      throw error;
    }
  }

  // Récupérer une mesure par ID
  async findOne(id: string): Promise<Mesure | undefined> {
    try {
      const response = await axios.get<Mesure>(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la mesure avec ID ${id} :`, error.message);
      throw error;
    }
  }

  // Mettre à jour une mesure
  async update(id: string, updatedMesure: Partial<Mesure>): Promise<Mesure | undefined> {
    try {
      const response = await axios.patch<Mesure>(`${this.apiUrl}/${id}`, updatedMesure);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la mesure avec ID ${id} :`, error.message);
      throw error;
    }
  }

  // Supprimer une mesure
  async delete(id: string): Promise<boolean> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la mesure avec ID ${id} :`, error.message);
      throw error;
    }
  }

  // Supprimer toutes les mesures
  async clearMesures(): Promise<void> {
    try {
      const response = await axios.get<Mesure[]>(this.apiUrl);
      const mesures = response.data;

      for (const mesure of mesures) {
        await axios.delete(`${this.apiUrl}/${mesure.id}`);
        console.log(`Mesure avec ID ${mesure.id} supprimée.`);
      }

      console.log('Toutes les mesures ont été supprimées.');
    } catch (error) {
      console.error('Erreur lors de la suppression des mesures :', error.message);
      throw error;
    }
  }
}
