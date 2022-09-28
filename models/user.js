'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    emailVerifiedAt: DataTypes.DATE,
    password: DataTypes.STRING,
    rememberToken: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    paranoid: true,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};