import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MesuresService } from './mesures.service';
import { Mesure } from './mesure.entity';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('mesures') // Tag Swagger pour regrouper les routes
@Controller('mesures')
export class MesuresController {
  constructor(private readonly mesuresService: MesuresService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle mesure' })
  @ApiResponse({ status: 201, description: 'La mesure a été créée avec succès.', type: Mesure })
  create(@Body() createMesureDto: CreateMesureDto): Mesure {
    return this.mesuresService.create(createMesureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les mesures' })
  @ApiResponse({ status: 200, description: 'Liste des mesures.', type: [Mesure] })
  findAll(): Mesure[] {
    return this.mesuresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une mesure par ID' })
  @ApiResponse({ status: 200, description: 'La mesure correspondante.', type: Mesure })
  @ApiResponse({ status: 404, description: 'Mesure non trouvée.' })
  findOne(@Param('id') id: string): Mesure | undefined {
    return this.mesuresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une mesure' })
  @ApiResponse({ status: 200, description: 'La mesure a été mise à jour.', type: Mesure })
  update(@Param('id') id: string, @Body() updateMesureDto: UpdateMesureDto): Mesure | undefined {
    return this.mesuresService.update(id, updateMesureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une mesure' })
  @ApiResponse({ status: 200, description: 'La mesure a été supprimée.' })
  delete(@Param('id') id: string): boolean {
    return this.mesuresService.delete(id);
  }
}
