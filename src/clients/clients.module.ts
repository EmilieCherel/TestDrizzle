import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ClientsController],
  imports: [DrizzleModule],
  providers: [ClientsService],
})
export class ClientsModule {}
