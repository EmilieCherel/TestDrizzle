import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/createClient.dto';
import { ScenarioDto } from './dto/scenario.dto';

@Controller()
export class ClientsController {
  constructor(private clientsServices: ClientsService) {}

  @Post('clients')
  async createClient(@Body() dto: CreateClientDto) {
    return await this.clientsServices.createClient(dto);
  }

  @Get('clients')
  async findAllClients() {
    return this.clientsServices.findAllClients();
  }

  @Get('clients/name/:name')
  async findByName(@Param('name') name: string) {
    return await this.clientsServices.findClientByName(name);
  }

  @Get('clients/id/:id')
  async findById(@Param('id') id: number) {
    return await this.clientsServices.findClientById(id);
  }

  @Post('scenarios')
  async createScenarios(@Body() dto: ScenarioDto) {
    return await this.clientsServices.createScenario(dto);
  }

  @Get('scenarios')
  async findAllScenarios() {
    return this.clientsServices.findAllScenarios();
  }

  @Get('scenarios/id/:id')
  async findScenariosById(@Param('id') id: number) {
    return await this.clientsServices.findScenarioById(id);
  }
}
