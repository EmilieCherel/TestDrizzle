import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import { eq } from 'drizzle-orm';
import { ScenarioDto } from './dto/scenario.dto';

@Injectable()
export class ScenariosService {
  constructor(
    @Inject(PG_CONNECTION)
    private conn: NodePgDatabase<typeof schema>,
  ) {}

  async createScenario(dto: ScenarioDto) {
    console.log(dto);
    const newScenario = await this.conn
      .insert(schema.scenario)
      .values({
        ...dto,
      })
      .returning();

    const { ...result } = newScenario[0];
    return result;
  }

  async findAllScenarios() {
    return await this.conn.query.scenario.findMany();
  }

  async findScenarioById(id: number) {
    try {
      const scenario = await this.conn.query.scenario.findFirst({
        with: {
          clients: true,
        },
        where: eq(schema.scenario.id, id),
      });
      if (!scenario) {
        throw new ConflictException('This scenario does not exist');
      } else {
        return scenario;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
