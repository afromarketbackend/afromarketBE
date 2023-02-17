const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Product extends Model {
    static associate(models){
        this.belongsTo(models.Merchant, {as: 'Merchant'}),
        this.belongsTo(models.Category, {as: "Category"}),
        this.hasMany(models.Inventory, {as: "Inventory"})
    }
  }
  Product.init(
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
        },
        defaultValue: ''
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
      category: {
        type: DataTypes.STRING,
      },
      isapproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      ratings: {
        type: DataTypes.INTEGER
      },
      status:{
        type: DataTypes.ENUM,
        values: ['available', 'out of stock'],
        defaultValue: 'available'
      },
      product_type: {
       type: DataTypes.ENUM,
        values:['product','inventory'],
        defaultValue: 'product'
      },
      real_product_id: {
        type: DataTypes.STRING,
      },
      inventory_owner: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Product
}