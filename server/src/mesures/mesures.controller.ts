import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MesuresService } from './mesures.service';
import { Mesure } from './mesure.entity';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('mesures')
@Controller('mesures')
export class MesuresController {
  constructor(private readonly mesuresService: MesuresService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle mesure' })
  @ApiResponse({ status: 201, description: 'La mesure a été créée avec succès.', type: Mesure })
  async create(@Body() createMesureDto: CreateMesureDto): Promise<Mesure> {
    return await this.mesuresService.create(createMesureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les mesures' })
  @ApiResponse({ status: 200, description: 'Liste des mesures.', type: [Mesure] })
  async findAll(): Promise<Mesure[]> {
    return await this.mesuresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une mesure par ID' })
  @ApiResponse({ status: 200, description: 'La mesure correspondante.', type: Mesure })
  @ApiResponse({ status: 404, description: 'Mesure non trouvée.' })
  async findOne(@Param('id') id: string): Promise<Mesure | undefined> {
    return await this.mesuresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une mesure' })
  @ApiResponse({ status: 200, description: 'La mesure a été mise à jour.', type: Mesure })
  async update(@Param('id') id: string, @Body() updateMesureDto: UpdateMesureDto): Promise<Mesure | undefined> {
    return await this.mesuresService.update(id, updateMesureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une mesure' })
  @ApiResponse({ status: 200, description: 'La mesure a été supprimée.' })
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.mesuresService.delete(id);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Supprimer toutes les mesures' })
  @ApiResponse({ status: 200, description: 'Toutes les mesures ont été supprimées.' })
  async clearMesures(): Promise<void> {
    await this.mesuresService.clearMesures();
  }
}
