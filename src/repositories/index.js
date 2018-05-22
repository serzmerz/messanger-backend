module.exports = (db) => {
  return ({
    authRepository: require('./authRepository').create(db),
    userRepository: require('./userRepository').create(db),
    messageRepository: require('./messageRepository').create(db)
  })
}
