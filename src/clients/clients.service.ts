import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema/index';
import { CreateClientDto } from './dto/createClient.dto';
import { eq } from 'drizzle-orm';
import { PG_CONNECTION } from 'src/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(PG_CONNECTION)
    private conn: NodePgDatabase<typeof schema>,
  ) {}

  async createClient(dto: CreateClientDto) {
    console.log(dto);
    try {
      const client = await this.conn.query.clients.findFirst({
        where: eq(schema.clients.name, dto.name),
      });

      if (client) throw new ConflictException('email duplicated');
    } catch (error) {
      console.log(error);
    }

    const newClient = await this.conn
      .insert(schema.clients)
      .values({
        name: dto.name,
        crm: dto.crm,
      })
      .returning({ clientId: schema.clients.id });

    await this.conn
      .insert(schema.clientScenario)
      .values([
        {
          idScenario: dto.scenarioId,
          idClient: newClient[0].clientId,
          name: dto.scenarioName,
        },
      ])
      .execute();

    const result = await this.conn.query.clients.findFirst({
      where: eq(schema.clients.id, newClient[0].clientId),
      with: {
        subscriptions: {
          columns: {},
          with: {
            scenario: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    return result;
  }

  async findAllClients() {
    return await this.conn.query.clients.findMany();
  }

  async findClientByName(name: string) {
    try {
      const client = await this.conn.query.clients.findFirst({
        with: {
          subscriptions: true,
        },
        where: eq(schema.clients.name, name),
      });
      if (!client) {
        throw new ConflictException('This user does not exist');
      } else {
        return client;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findClientById(id: number) {
    try {
      const client = await this.conn.query.clients.findFirst({
        with: {
          subscriptions: true,
        },
        where: eq(schema.clients.id, id),
      });
      if (!client) {
        throw new ConflictException('This user does not exist');
      } else {
        return client;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
