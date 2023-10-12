import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { ScenariosModule } from './scenarios/scenarios.module';

@Module({
  imports: [
    ClientsModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScenariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
