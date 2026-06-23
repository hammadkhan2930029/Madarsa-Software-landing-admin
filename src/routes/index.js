const express = require('express')
const publicRoutes = require('./publicRoutes')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

router.use('/public', publicRoutes)
router.use('/admin', adminRoutes)

router.get('/health', (req, res) => {
  res.json({ ok: true })
})

module.exports = router
