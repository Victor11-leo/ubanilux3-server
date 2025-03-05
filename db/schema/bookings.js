const { relations } = require("drizzle-orm");
const { serial, text, pgSchema,date, pgEnum, integer, pgTable } = require("drizzle-orm/pg-core");
const { Users } = require("./users.js");
const { Cars } = require("./cars.js");

const mySchema = pgSchema("my_schema");

const statusEnum = pgEnum('status', ['pending', 'approved', 'denied','cancelled','picked up']);

const Bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  pickupDate: date('pickupDate'),
  paymentId: text('paymentId'),
  phone: text('phone'),
  userId: integer('user_id'),
  carId: integer('car_id'),
  status: statusEnum().default('pending'),
});

const bookingRelations = relations(Bookings,({one}) => ({
    user:one(Users,{
        fields:[Bookings.userId],
        references:[Users.id]
    }),
    car:one(Cars,{
        fields:[Bookings.carId],
        references:[Cars.id]
    }),
}))

module.exports = {
    Bookings,
    bookingRelations,
    statusEnum
}

