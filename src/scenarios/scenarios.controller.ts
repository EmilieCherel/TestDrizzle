import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';
import { ScenarioDto } from './dto/scenario.dto';

@Controller('scenarios')
export class ScenariosController {
  constructor(private scenariosServices: ScenariosService) {}

  @Post()
  async createScenarios(@Body() dto: ScenarioDto) {
    return await this.scenariosServices.createScenario(dto);
  }

  @Get()
  async findAllScenarios() {
    return this.scenariosServices.findAllScenarios();
  }

  @Get('/id/:id')
  async findScenariosById(@Param('id') id: number) {
    return await this.scenariosServices.findScenarioById(id);
  }
}
