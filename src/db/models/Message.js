const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Message extends Model {
    static associate(models){
    }
  }
  Message.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      roomID: {
        unique: true,
        type: DataTypes.UUID,
      },
      receiverEmail: {
        type: DataTypes.STRING,
      },
      senderEmail:{
        type: DataTypes.STRING,
      },
      text:{
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Message",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Message
}