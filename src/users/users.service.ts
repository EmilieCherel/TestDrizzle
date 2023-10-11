import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { UsersDto } from './dto/users.dto';
import { eq } from 'drizzle-orm';
import { PG_CONNECTION } from 'src/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION)
    private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: UsersDto) {
    console.log(dto);
    try {
      const user = await this.conn.query.user.findFirst({
        where: eq(schema.user.email, dto.email),
      });

      if (user) throw new ConflictException('email duplicated');
    } catch (error) {
      console.log(error);
    }

    const newUsers = await this.conn
      .insert(schema.user)
      .values({
        ...dto,
      })
      .returning();

    const { ...result } = newUsers[0];
    return result;
  }

  async findAll() {
    return await this.conn.query.user.findMany();
  }

  async findByName(name: string) {
    try {
      const user = await this.conn.query.user.findFirst({
        where: eq(schema.user.name, name),
      });
      if (!user) {
        throw new ConflictException('This user does not exist');
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.conn.query.user.findFirst({
        where: eq(schema.user.id, id),
      });
      if (!user) {
        throw new ConflictException('This user does not exist');
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findByProfile(id: number) {
    try {
      const user = await this.conn.query.user.findFirst({
        with: {
          profile: true,
        },
        where: eq(schema.user.id, id),
      });
      if (!user) {
        throw new ConflictException('This user does not exist');
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
