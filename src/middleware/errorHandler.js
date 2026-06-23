function notFound(req, res) {
  res.status(404).json({ message: 'Route not found' })
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  const status = error.status || 500
  res.status(status).json({
    message: error.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  })
}

module.exports = { notFound, errorHandler }
