const { serial, text, pgSchema, boolean, pgTable } = require("drizzle-orm/pg-core");

const mySchema = pgSchema("my_schema");

const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  photo: text('photo').notNull(),
  userId: text('userId').unique(),
  isAdmin: boolean('isAdmin').default(false),
});

module.exports ={Users}

