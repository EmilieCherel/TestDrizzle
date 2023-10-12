import { Module } from '@nestjs/common';
import { ScenariosController } from './scenarios.controller';
import { ScenariosService } from './scenarios.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ScenariosController],
  imports: [DrizzleModule],
  providers: [ScenariosService],
})
export class ScenariosModule {}
