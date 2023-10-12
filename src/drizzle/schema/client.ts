import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { clientScenario } from './clientScenario';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name'),
  crm: text('crm'),
});

export const clientRelations = relations(clients, ({ many }) => ({
  subscriptions: many(clientScenario),
}));
