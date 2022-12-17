const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Order extends Model {
    static associate(models){
      this.belongsTo(models.User, {as: "User", onDelete: "CASCADE"})
      this.belongsTo(models.Tracker, {as: "Tracker"})
    }
  }
  Order.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      items: {
        type: DataTypes.STRING,
        get(){
          return this.getDataValue('items').split(';')
        },
        set(val){
          this.setDataValue('items', val.join(';'))
        }
      },
        isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      payment_type: {
        type: DataTypes.ENUM,
        values: ["pay-now", "on-delivery"],
        defaultValue: "on-delivery"
      },
      order_cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      delivery_type:{
        type: DataTypes.ENUM,
        values: ['door_delivery', 'pickup_station'],
        defaultValue: 'door_delivery'
      },
      delivery_address:{
        type: DataTypes.STRING,
        allowNull: false
      },
      delivery_date:{
        type: DataTypes.DATE
      },
      customer_contact:{
        type: DataTypes.STRING
      },
      status:{
        type: DataTypes.ENUM,
        values: ["canceled", "active","delivered", "disputed"],
        defaultValue: "active"
      },
      trackingId:{
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Order
}