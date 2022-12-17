const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Inventory extends Model {
    static associate(models){
        this.belongsTo(models.Merchant, {as: 'Merchant'}),
        this.belongsTo(models.Product, {as: "Product"}),
        this.belongsTo(models.Category, {as: "Category"})
    }
  }
  Inventory.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      images: {
        type: DataTypes.STRING,
        get(){
          return this.getDataValue('images').split(';')
        },
        set(val){
          this.setDataValue('images', val.join(';'))
        }
      },
      description: {
        type: DataTypes.STRING,
      },
      specific_details: {
        type: DataTypes.JSON,
        defaultValue: {}
      },
      quantity_available: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price: {
        type: DataTypes.INTEGER
      },
      isapproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ratings: {
        type: DataTypes.INTEGER
      },
      status:{
        type: DataTypes.ENUM,
        values: ['available', 'out of stock'],
        defaultValue: 'available'
      },
      inventory_owner:{
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Inventory",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Inventory
}