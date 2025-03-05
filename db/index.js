const { drizzle } = require( 'drizzle-orm/neon-http');
require('dotenv').config()

const db = drizzle(process.env.DB_URL);

module.exports = {db}