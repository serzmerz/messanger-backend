const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json(info)
    }
    req.user = user
    return next()
  })(req, res, next)
}
