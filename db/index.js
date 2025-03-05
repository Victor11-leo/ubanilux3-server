const { drizzle } = require( 'drizzle-orm/neon-http');


const db = drizzle('postgresql://neondb_owner:npg_lI4sFxpOBP6r@ep-ancient-star-a8wh789u-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

export {
    db
}