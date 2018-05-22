const cryptPassword = require('../libs/crypto').cryptPassword

function create ({ User }) {
  async function createUser ({ username, password }) {
    return User.create({
      username,
      passwordHash: await cryptPassword(password)
    })
  }

  async function findUserByUsername (username) {
    return User.findOne({ where: { username } })
  }

  async function getUserById (id) {
    return User.findById(id, {attributes: {exclude: ['passwordHash', 'createdAt', 'updatedAt']}})
  }

  async function updateUser (data, id) {
    return User.update(data, { where: { id } })
  }

  async function confirmUserSignUp (secretHash) {
    const user = await User.findOneOrError({ where: { secretHash, confirmSignUp: false } })
    return user.update({ confirmSignUp: true })
  }

  async function findUserByEmail (email) {
    return User.findOneOrError({ where: { email } })
  }

  async function getUserBySecretHash (secretHash) {
    return User.findOneOrError({ where: { secretHash } })
  }

  return {
    createUser,
    getUserById,
    findUserByUsername,
    updateUser,
    confirmUserSignUp,
    findUserByEmail,
    getUserBySecretHash
  }
}

module.exports.create = create
