const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Customer extends Model {
    static associate(models){
    }
  }
  Customer.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      customer_id: {
        type: DataTypes.STRING
      },      
      customer_name: {
        type: DataTypes.STRING
      },
      customer_contact: {
        unique: true,
        type: DataTypes.STRING,
      },
      customer_address:{
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Customer",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Customer
}