// https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sqlite-core/README.md
import { db } from './db';
import { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const elements = sqliteTable('elements', {
  id: integer('id').primaryKey(),
  dn: text('dn').notNull(),
  deviceType: text('device_type').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  ip: text('ip').notNull(),
});

export type Element = InferModel<typeof elements>;
export type InsertElement = InferModel<typeof elements, 'insert'>;

export const getAllElements = () => {
  const allElements = db.select().from(elements).all();
  return allElements;
};

export const insertElement = async (element: InsertElement) => {
  return db.insert(elements).values(element).run();
};
