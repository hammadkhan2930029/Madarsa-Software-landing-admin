const { query } = require('../config/db')
const httpError = require('../utils/httpError')

function normalizeDbValue(value) {
  if (value === undefined) return undefined
  if (value === '') return null
  return value
}

function mapInput(input, fields) {
  return fields.reduce((mapped, field) => {
    if (Object.prototype.hasOwnProperty.call(input, field.api)) {
      const value = normalizeDbValue(input[field.api])
      if (value !== undefined) {
        mapped[field.column] = value
      }
    }
    return mapped
  }, {})
}

function mapRow(row, fields) {
  return fields.reduce((mapped, field) => {
    mapped[field.api] = row[field.column]
    return mapped
  }, { id: row.id })
}

function isTruthyValue(value) {
  return value === true || value === 1 || value === '1' || value === 'true' || value === 'yes'
}

function createCrudService(config) {
  const table = config.table
  const fields = config.fields
  const orderBy = config.orderBy || 'id ASC'
  const softDelete = config.softDelete !== false
  const defaultColumn = config.defaultColumn

  return {
    mapRow(row) {
      return mapRow(row, fields)
    },

    async list({ activeOnly = false } = {}) {
      const where = activeOnly && fields.some((field) => field.column === 'status')
        ? 'WHERE status = "active"'
        : ''
      const rows = await query(`SELECT * FROM ${table} ${where} ORDER BY ${orderBy}`)
      return rows.map((row) => mapRow(row, fields))
    },

    async get(id) {
      const rows = await query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [id])
      if (!rows.length) throw httpError(404, 'Record not found')
      return mapRow(rows[0], fields)
    },

    async create(input) {
      const data = mapInput(input, fields)
      const columns = Object.keys(data)
      if (!columns.length) throw httpError(400, 'No data supplied')

      const placeholders = columns.map(() => '?').join(', ')
      const result = await query(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
        columns.map((column) => data[column]),
      )
      if (defaultColumn && isTruthyValue(data[defaultColumn])) {
        await query(`UPDATE ${table} SET ${defaultColumn} = 0 WHERE id <> ?`, [result.insertId])
      }
      return this.get(result.insertId)
    },

    async update(id, input) {
      const data = mapInput(input, fields)
      const columns = Object.keys(data)
      if (!columns.length) return this.get(id)

      await query(
        `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(', ')} WHERE id = ?`,
        [...columns.map((column) => data[column]), id],
      )
      if (defaultColumn && isTruthyValue(data[defaultColumn])) {
        await query(`UPDATE ${table} SET ${defaultColumn} = 0 WHERE id <> ?`, [id])
      }
      return this.get(id)
    },

    async replaceSingleton(input) {
      const existing = await query(`SELECT id FROM ${table} ORDER BY id ASC LIMIT 1`)
      if (existing.length) {
        return this.update(existing[0].id, input)
      }
      return this.create(input)
    },

    async remove(id) {
      if (softDelete && fields.some((field) => field.column === 'status')) {
        await query(`UPDATE ${table} SET status = "inactive" WHERE id = ?`, [id])
      } else {
        await query(`DELETE FROM ${table} WHERE id = ?`, [id])
      }
      return { id: Number(id), deleted: true }
    },
  }
}

module.exports = { createCrudService }
