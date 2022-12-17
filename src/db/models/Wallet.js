const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Wallet extends Model {
    static associate(models){
      this.belongsTo(models.User, {as:'User', onDelete: 'CASCADE'})
    }
  }
  Wallet.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      text: {
        type: DataTypes.STRING
      },
      available_balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
       previous_balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Wallet",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Wallet
}