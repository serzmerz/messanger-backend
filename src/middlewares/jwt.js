const jwtValidator = require('express-jwt')
const jwtGenerator = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const User = require('../models').User
const createError = require('http-errors')

const execute = [
  '/',
  '/login',
  '/signup',
  /^\/public.*/i,
  /^\/signup.*/i,
  '/auth/forgot',
  /^\/auth\/restore.*/i,
  '/status'
]
const guard = jwtValidator({ secret: JWT_SECRET }).unless({ path: execute })
const fetchingUser = async function (req, res, next) {
  if (req.user) {
    const user = await User.findById(req.user.id)
    if (user) {
      req.user = user
      next()
    } else {
      next(new createError.Unauthorized())
    }
  } else {
    next()
  }
}

const generator = function ({ email, id }) {
  return jwtGenerator.sign({
    email, id
  }, JWT_SECRET)
}

module.exports = {
  guard: [
    guard,
    fetchingUser
  ],
  generator
}
