import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { clientScenario } from './clientScenario';

export const scenario = pgTable('scenario', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const scenarioRelations = relations(scenario, ({ many }) => ({
  clients: many(clientScenario),
}));
