const fs = require('fs')
const path = require('path')
const multer = require('multer')
const httpError = require('../utils/httpError')

const uploadDir = path.resolve(process.env.UPLOAD_DIR || 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/x-icon',
  'image/vnd.microsoft.icon',
])

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadDir)
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase()
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase()
    callback(null, `${Date.now()}-${base || 'image'}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_UPLOAD_SIZE_MB || 5) * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(httpError(400, 'Only image files are allowed'))
      return
    }

    callback(null, true)
  },
})

module.exports = { upload }
