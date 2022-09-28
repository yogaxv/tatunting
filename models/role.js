'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsTo(models.User);

      Role.belongsToMany(models.Permission, {
        through: 'RolePermission',
      });
    }
  }
  Role.init({
    role_name: DataTypes.STRING,
    role_description: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    paranoid: true,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};