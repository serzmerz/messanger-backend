const bcrypt = require('bcrypt')

exports.cryptPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return reject(err)

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err)
        resolve(hash)
      })
    })
  })
}

exports.comparePassword = function (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, isPasswordMatch) {
      if (err) reject(err)
      resolve(isPasswordMatch)
    })
  })
}
