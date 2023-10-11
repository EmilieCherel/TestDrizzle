import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  async findAll() {
    return this.usersServices.findAll();
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return this.usersServices.findByName(name);
  }

  @Get('/id/:id')
  async findById(@Param('id') id: number) {
    return this.usersServices.findById(id);
  }

  @Get('/profile/:id')
  async findByProfile(@Param('id') id: number) {
    return this.usersServices.findByProfile(id);
  }

  @Post()
  async createUser(@Body() dto: UsersDto) {
    return await this.usersServices.create(dto);
  }
}
