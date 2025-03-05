const { defineConfig } = require("drizzle-kit")

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: '.db/schema/*.ts',
  dbCredentials:{
    url:"postgresql://neondb_owner:npg_lI4sFxpOBP6r@ep-ancient-star-a8wh789u-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  }
})
