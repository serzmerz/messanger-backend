'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING
    }
  })
  UserModel.associate = function (models) {
    UserModel.belongsToMany(models.Group, { through: 'GroupUser' })
    UserModel.belongsToMany(UserModel, { through: 'Friends', as: 'friends' })
    UserModel.belongsToMany(models.Message, { through: 'MessageUser', as: 'lastRead' })
  }
  sequelize.sync()
  return UserModel
}
