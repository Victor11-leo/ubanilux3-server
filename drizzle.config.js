const { defineConfig } = require("drizzle-kit")
require('dotenv').config()


export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './db/schema/*.js',
  dbCredentials:{
    url:process.env.DB_URL
  }
})
