'use strict'

module.exports = (sequelize, DataTypes) => {
  const MessageModel = sequelize.define('Message', {
    text: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    GroupId: { type: DataTypes.INTEGER }
  })
  MessageModel.associate = function (models) {
    MessageModel.belongsTo(models.User)
    // track last read message in a group for a given user
    MessageModel.belongsToMany(models.User, { through: 'MessageUser', as: 'lastRead' })
    // messages are sent to groups
    MessageModel.belongsTo(models.User)
    MessageModel.belongsTo(models.Group)
  }
  sequelize.sync()
  return MessageModel
}
