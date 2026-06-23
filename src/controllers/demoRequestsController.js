const { query } = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const list = asyncHandler(async (req, res) => {
  const rows = await query('SELECT * FROM demo_requests ORDER BY created_at DESC')
  res.json(rows)
})

const updateStatus = asyncHandler(async (req, res) => {
  await query('UPDATE demo_requests SET status = ? WHERE id = ?', [req.body.status || 'new', req.params.id])
  res.json({ id: Number(req.params.id), status: req.body.status || 'new' })
})

module.exports = { list, updateStatus }
