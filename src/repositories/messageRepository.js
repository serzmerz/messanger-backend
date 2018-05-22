function create ({ User, Message }) {
  async function getAll (GroupId) {
    return Message.findAll({
      where: { GroupId },
      include: [User],
      order: [['id', 'DESC']]
    })
  }

  async function add (UserId, GroupId, text, image) {
    const data = { UserId, GroupId, text }
    if (image) data.image = image.path
    return Message.create(data)
  }

  return {
    getAll,
    add
  }
}

module.exports.create = create
