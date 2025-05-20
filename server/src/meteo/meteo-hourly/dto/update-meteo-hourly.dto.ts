import { PartialType } from '@nestjs/swagger';
import { CreateMeteoHourlyDto } from './create-meteo-hourly.dto';

export class UpdateMeteoHourlyDto extends PartialType(CreateMeteoHourlyDto) {}
