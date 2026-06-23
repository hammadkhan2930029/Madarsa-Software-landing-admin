const fs = require('fs/promises')
const path = require('path')
const { pool } = require('../config/db')

async function run() {
  const schema = await fs.readFile(path.join(__dirname, '../database/schema.sql'), 'utf8')
  const statements = schema
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean)

  for (const statement of statements) {
    await pool.query(statement)
  }

  console.log('Database schema created successfully')
  await pool.end()
}

run().catch(async (error) => {
  console.error(error)
  await pool.end()
  process.exit(1)
})
