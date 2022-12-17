const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Dispute extends Model {
    static associate(models){
      this.belongsTo(models.User, {as: "User"}),
      this.belongsTo(models.Order, {as:"Order"})
    }
  }
  Dispute.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      product_image: {
        type: DataTypes.STRING,
      },
      reason: {
        type: DataTypes.ENUM,
        values:['Wrong Order', 'Lost Order', 'Damaged Product', 'Fake Product']
      },
      status: {
       type: DataTypes.ENUM,
        values:['Initiated','Resolved'],
        defaultValue: 'Initiated'
      },
      awarded_to:{
        type: DataTypes.ENUM,
        values: ["customer", "seller", "inView"],
        defaultValue: "inView"
      },
      description: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Dispute",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Dispute
}