import { ApiProperty } from '@nestjs/swagger';

export class CreateMesureDto {
  @ApiProperty({ description: 'Température mesurée', example: 25.5 })
  temperature: number;

  @ApiProperty({ description: 'Humidité mesurée par le capteur 1', example: 60 })
  humidity1: number;

  @ApiProperty({ description: 'Humidité mesurée par le capteur 2', example: 65 })
  humidity2: number;

  @ApiProperty({ description: 'Intensité lumineuse mesurée', example: 800 })
  lightIntensity: number;

  @ApiProperty({ description: 'Horodatage de la mesure', example: '2025-03-30T12:34:56.789Z' })
  timestamp: string;
}