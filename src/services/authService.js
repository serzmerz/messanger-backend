const createError = require('http-errors')

function create ({ authRepository }) {
  async function signUp (userData) {
    const user = await authRepository.findUserByUsername(userData.username)
    if (user) throw new createError.BadRequest('User has been exist')
    return authRepository.createUser(userData)
  }

  async function getUser (id) {
    return authRepository.getUserById(id)
  }
  return {
    signUp,
    getUser
  }
}

module.exports.create = create
