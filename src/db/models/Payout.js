const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Payout extends Model {
    static associate(models){
      this.belongsTo(models.Merchant, {as: "Merchant"})
    }
  }
  Payout.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      payable_amount: {
        type: DataTypes.INTEGER,
      },
      debit_currency:{
        type: DataTypes.STRING,
        defaultValue: 'NGN'
      },
      email: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      tax: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['NEW', 'SUCCESSFUL', 'FAILED'],
        defaultValue: 'NEW'
      },
      narration:{
        type: DataTypes.STRING,
      },
      date_initiated :{
        type: DataTypes.DATE,
      },
      date_paid:{
        type: DataTypes.DATE,
      },
      beneficiary_account_bank:{
        type: DataTypes.STRING,
      },
      beneficiary_account_name:{
        type: DataTypes.STRING,
      },
      beneficiary_account_number:{
        type: DataTypes.STRING,
      },
      payment_ref:{
        type: DataTypes.STRING,
      },
      flw_transfer_id:  {
        type: DataTypes.INTEGER,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Payout",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Payout
}