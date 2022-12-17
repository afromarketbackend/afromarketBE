const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class User extends Model {
    static associate(models){
      this.hasMany(models.Order, {as: "Order"}),
      this.hasOne(models.Wallet, {as: "Wallet"})

    }
  }
  User.init(
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
      avatar:{
        type: DataTypes.STRING,
        allowNull: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      refreshTokens: {
        type: DataTypes.STRING
      },
      delivery_address:{
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "User",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return User
}