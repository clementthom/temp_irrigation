import { PartialType } from '@nestjs/swagger';
import { CreateMeteoDailyDto } from './create-meteo-daily.dto';

export class UpdateMeteoDailyDto extends PartialType(CreateMeteoDailyDto) {}
