import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name'),
  crm: text('crm'),
});

export const clientRelations = relations(clients, ({ many }) => ({
  subscriptions: many(clientScenario),
}));

export const scenario = pgTable('scenario', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const scenarioRelations = relations(scenario, ({ many }) => ({
  clients: many(clientScenario),
}));

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
