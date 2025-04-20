import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommandService } from './command.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export interface CommandVannePayload {
  action: 'open' | 'close';
}

@ApiTags('command')
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post('command-vanne/:id')
  @ApiOperation({ summary: 'Commande des vannes' })
  @ApiResponse({ status: 200, description: 'Commande envoyée pour forcer l\'état d\'une vanne.' })
  async commandVanne(@Param('id') vanne: string, @Body() payload: CommandVannePayload): Promise<void> {
    const { action } = payload;
    await this.commandService.commmandVanne(vanne, action);
  }
}
