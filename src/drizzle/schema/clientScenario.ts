import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { scenario } from './scenario';
import { clients } from './client';

export const clientScenario = pgTable('clientscenario', {
  id: serial('id').primaryKey(),
  idScenario: integer('scenario_id')
    .notNull()
    .references(() => scenario.id),
  idClient: integer('client_id')
    .notNull()
    .references(() => clients.id),
  name: text('name').notNull(),
});

export const clientScenarioRelations = relations(clientScenario, ({ one }) => ({
  client: one(clients, {
    fields: [clientScenario.idClient],
    references: [clients.id],
  }),

  scenario: one(scenario, {
    fields: [clientScenario.idScenario],
    references: [scenario.id],
  }),
}));
