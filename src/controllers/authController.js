const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { query } = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')
const httpError = require('../utils/httpError')

function signToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
}

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw httpError(400, 'Email and password are required')

  const rows = await query('SELECT * FROM admins WHERE email = ? AND status = ? LIMIT 1', [email, 'active'])
  if (!rows.length) throw httpError(401, 'Invalid credentials')

  const admin = rows[0]
  const isValidPassword = await bcrypt.compare(password, admin.password_hash)
  if (!isValidPassword) throw httpError(401, 'Invalid credentials')

  res.json({
    token: signToken(admin),
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status,
    },
  })
})

const me = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin })
})

const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out' })
})

module.exports = { login, me, logout }
