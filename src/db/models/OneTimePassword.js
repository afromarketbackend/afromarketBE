const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class OneTimePassword extends Model {
    static associate(models){
    }
  }
  OneTimePassword.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      otp: {
        type: DataTypes.STRING
      },
      signedToken: {
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "OneTimePassword",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return OneTimePassword
}