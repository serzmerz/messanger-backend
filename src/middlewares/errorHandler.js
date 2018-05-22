const {NODE_ENV} = process.env

module.exports = function errorHandler (error, req, res, next) {
  const body = {
    success: false,
    error: error.message || 'Internal server error'
  }

  if (NODE_ENV === 'development') body.trace = error.stack
  res.status(error.status || 500).json(body)
  next()
}
