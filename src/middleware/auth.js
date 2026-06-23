const jwt = require('jsonwebtoken')
const { query } = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')
const httpError = require('../utils/httpError')

const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    throw httpError(401, 'Authentication token required')
  }

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    throw httpError(401, 'Invalid or expired token')
  }

  const admins = await query(
    'SELECT id, name, email, role, status FROM admins WHERE id = ? AND status = ? LIMIT 1',
    [payload.id, 'active'],
  )

  if (!admins.length) {
    throw httpError(401, 'Admin account not found or inactive')
  }

  req.admin = admins[0]
  next()
})

module.exports = { requireAuth }
