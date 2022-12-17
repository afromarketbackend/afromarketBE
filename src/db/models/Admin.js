const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Admin extends Model {
    static associate(models){
    }
  }
  Admin.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values:["super", "admin"],
        defaultValue: "admin",
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      refreshTokens: {
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Admin",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Admin
}