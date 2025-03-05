const { serial, text, pgSchema, boolean, pgTable } = require("drizzle-orm/pg-core");

export const mySchema = pgSchema("my_schema");

export const Cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  name: text('name'),
  rentalPrice: text('rentalPrice'),
  image: text('image'),
  model: text('model'),
  description: text('description'),
});
