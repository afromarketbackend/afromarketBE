const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Notification extends Model {
    static associate(models){
      this.belongsTo(models.Merchant, {as: "Merchant", onDelete: "CASCADE"})
      this.belongsTo(models.User, {as: "User", onDelete: "CASCADE"})
    }
  }
  Notification.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING
      },
      body: {
        unique: true,
        type: DataTypes.STRING,
      },
      associated_model:{
        type: DataTypes.STRING,
        allowNull: true
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Notification",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Notification
}