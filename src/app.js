const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

dotenv.config()

const app = express()
const uploadDir = path.resolve(process.env.UPLOAD_DIR || 'uploads')
const origins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || !origins.length || origins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(uploadDir))
app.use('/api', routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app
