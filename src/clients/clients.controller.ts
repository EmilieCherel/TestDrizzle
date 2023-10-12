import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/createClient.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsServices: ClientsService) {}

  @Post()
  async createClient(@Body() dto: CreateClientDto) {
    return await this.clientsServices.createClient(dto);
  }

  @Get()
  async findAllClients() {
    return this.clientsServices.findAllClients();
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return await this.clientsServices.findClientByName(name);
  }

  @Get('/id/:id')
  async findById(@Param('id') id: number) {
    return await this.clientsServices.findClientById(id);
  }
}
