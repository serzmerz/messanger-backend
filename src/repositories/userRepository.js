const db = require('../models/index')
const Op = db.Sequelize.Op
const createError = require('http-errors')

function create ({ User, Message, Group }) {
  async function getUserGroups (userId) {
    const user = await User.findById(userId)
    return user.getGroups({
      include: [{
        model: Message,
        include: [ User ],
        order: [['createdAt', 'DESC']],
        limit: 1
      }]
    })
  }

  async function getUserGroup (id) {
    return Group.findOne({
      where: { id },
      include: [
        User,
        {
          model: Message,
          include: [ User ],
          order: [['createdAt', 'DESC']],
          limit: 1
        }]
    })
  }

  async function getUserFriends (userId) {
    const user = await User.findById(userId)
    return user.getFriends()
  }

  async function findAllUsers ({ search }) {
    return User.findAll({ where: { username: { [Op.iLike]: `%${search}%` } } })
  }

  async function addFriend (userId, friendId) {
    const user = await User.findByIdOrError(userId)
    const friend = await User.findByIdOrError(friendId)
    return user.addFriend(friend)
  }

  async function createGroup (userId, data, image) {
    const user = await User.findByIdOrError(userId)
    const friends = await user.getFriends({ where: { id: { $in: JSON.parse(data.userIds) } } })
    if (image) data.icon = image.path
    const group = await Group.create(data)
    await group.addUsers([user, ...friends])
    return Group.findById(group.id, {
      include: [{
        model: Message,
        include: [ User ],
        order: [['createdAt', 'DESC']],
        limit: 1
      }]
    })
  }

  async function updateGroup (id, data, image) {
    const group = await Group.findByIdOrError(id)
    if (image) data.icon = image.path
    await group.update(data)
    return getUserGroup(id)
  }

  async function updateUser (userId, data, image) {
    const user = await User.findOne({ where: { username: data.username } })
    if (user) throw new createError.BadRequest('User has been exist')
    if (image) data.image = image.path
    await User.update(data, { where: { id: userId } })
    return User.findById(userId)
  }

  async function leaveGroup (groupId, userId) {
    const group = await Group.findOneOrError({
      where: { id: groupId },
      include: [{
        model: User,
        where: { id: userId }
      }]
    })
    await group.removeUser(userId)
    const users = await group.getUsers()
    if (!users.length) await group.destroy()
    return { id: groupId }
  }

  async function removeGroup (groupId, userId) {
    const group = await Group.findOneOrError({
      where: { id: groupId },
      include: [{
        model: User,
        where: { id: userId }
      }]
    })
    const users = await group.getUsers()
    await group.removeUsers(users)
    await Message.destroy({ where: { GroupId: group.id } })
    await group.destroy()
    return { id: groupId }
  }

  return {
    getUserGroups,
    getUserFriends,
    findAllUsers,
    addFriend,
    createGroup,
    updateUser,
    getUserGroup,
    updateGroup,
    leaveGroup,
    removeGroup
  }
}

module.exports.create = create
