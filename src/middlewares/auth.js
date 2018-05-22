const passport = require('passport')
const {User} = require('../models')
const {Strategy} = require('passport-local')
const {comparePassword} = require('../libs/crypto')

passport.use(new Strategy(async (username, password, done) => {
  const pass = (...args) => done(null, ...args)
  try {
    const user = await User.findOne({ where: { username }})
    if (!user) {
      return pass(false, {
        _error: 'Invalid username or password'
      })
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash)

    if (isPasswordValid) {
      return pass(user)
    } else {
      return pass(false, {
        _error: 'Invalid username or password'
      })
    }
  } catch (err) {
    return done(err)
  }
}))

/**
 * @type {Passport}
 */
module.exports = passport
