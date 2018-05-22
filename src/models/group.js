'use strict'

module.exports = (sequelize, DataTypes) => {
  const GroupModel = sequelize.define('Group', {
    name: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING }
  })
  GroupModel.associate = function (models) {
    GroupModel.belongsToMany(models.User, { through: 'GroupUser' })
    GroupModel.hasMany(models.Message)
  }
  sequelize.sync()
  return GroupModel
}
