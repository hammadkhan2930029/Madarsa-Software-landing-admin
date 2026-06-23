const express = require('express')
const publicController = require('../controllers/publicController')

const router = express.Router()

router.get('/landing', publicController.getLanding)
router.post('/demo-requests', publicController.createDemoRequest)

module.exports = router
