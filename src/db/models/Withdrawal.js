const {Model} = require('sequelize')
const { setDueDate } = require('../../common/helpers/deliveryDate')

module.exports = (sequelize, DataTypes) =>{
  class Withdrawal extends Model {
    static associate(models){
      this.belongsTo(models.Merchant, {as: "Merchant"})
    }
  }
  Withdrawal.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      tx_ref: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      currency:{
        type: DataTypes.STRING,
        defaultValue: 'NGN'
      },
      order_id: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'successful', 'failed', "approved"],
        defaultValue: 'pending'
      },
      tax: {
        type: DataTypes.INTEGER,
      },
      resale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      due_date :{
        type: DataTypes.DATE,
        defaultValue: setDueDate(7)
      },
      date_paid:{
        type: DataTypes.DATE,
      },
      payment_ref:{
        type: DataTypes.STRING,
        defaultValue: ""
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Withdrawal",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Withdrawal
}