import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MesuresService } from './mesures.service';
import { Mesure } from './mesure.entity';

@Controller('mesures')
export class MesuresController {
  constructor(private readonly mesuresService: MesuresService) {}

  @Post()
  create(@Body() mesure: Omit<Mesure, 'id'>): Mesure {
    return this.mesuresService.create(mesure);
  }

  @Get()
  findAll(): Mesure[] {
    return this.mesuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Mesure | undefined {
    return this.mesuresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedMesure: Partial<Mesure>): Mesure | undefined {
    return this.mesuresService.update(id, updatedMesure);
  }

  @Delete(':id')
  delete(@Param('id') id: string): boolean {
    return this.mesuresService.delete(id);
  }
}
