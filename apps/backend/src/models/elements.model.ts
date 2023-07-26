// https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sqlite-core/README.md
import { db } from './db';
import { eq, InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const elements = sqliteTable('elements', {
  id: integer('id').primaryKey(),
  dn: text('dn').notNull(),
  deviceType: text('device_type').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  ip: text('ip').notNull(),
});

type Element = InferModel<typeof elements>;
type InsertElement = InferModel<typeof elements, 'insert'>;

const getAllElements = () => {
  const allElements = db.select().from(elements).all();
  return allElements;
};

const insertElement = (element: InsertElement) => {
  const newElement = db.insert(elements).values(element).returning().get();
  return newElement;
};

const deleteElement = (elementId: number) => {
  db.delete(elements)
    .where(eq(elements.id, elementId))
    .run();
};

export const elementsRepository = {
  getAllElements,
  insertElement,
  deleteElement,
}
