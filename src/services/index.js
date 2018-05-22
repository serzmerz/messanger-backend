module.exports = (repositories) => {
  return ({
    authService: require('./authService').create(repositories)
  })
}
