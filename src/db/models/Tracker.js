const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Tracker extends Model {
    static associate(models){
      this.belongsTo(models.Order, {as: "Order"})
    }
  }
  Tracker.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      status:{
        type: DataTypes.ENUM,
        values: [
                "order_placed", 
                "order_in_progress", 
                "order_shipped", 
                "order_out_for_delivery", 
                "order_id_delivered"
            ],
        defaultValue: 'order_placed'
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
      modelName: "Tracker",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Tracker
  
}