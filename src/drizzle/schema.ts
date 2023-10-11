import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  age: integer('age'),
  password: text('password'),
  address: text('address'),
});

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [user.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  text: varchar('text', { length: 256 }),
  authorId: integer('author_id')
    .notNull()
    .references(() => user.id),
});

export const postRelations = relations(posts, ({ one }) => ({
  user: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
}));

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  bio: varchar('bio', { length: 256 }),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
});
