const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Merchant extends Model {
    static associate(models){
        this.hasMany(models.Product, {as: 'Product'})
        this.hasMany(models.Inventory, {as: 'Inventory'})

    }
  }
  Merchant.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      business_name: {
        type: DataTypes.STRING
      },
      business_type: {
        type: DataTypes.ENUM,
        values: ['public limited company', 'private limited company'],
        defaultValue: 'public limited company'
      },
      business_description: {
        type: DataTypes.STRING,
      },
      address:{
        type: DataTypes.STRING,
      },
      bank_name: {
        type: DataTypes.STRING
      },
      account_name: {
        type: DataTypes.STRING
      },
      account_number:{
        type: DataTypes.STRING,
      },
      bank_verification_number:{
        type: DataTypes.INTEGER,
      },
      cac_document:{
        type: DataTypes.STRING,
      },
      tax_id_number:{
        type: DataTypes.INTEGER
      },
      brand_image:{
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      refreshTokens: {
        type: DataTypes.STRING
      },
      ratings: {
        type: DataTypes.INTEGER
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
  
    },
    {
      sequelize,
      modelName: "Merchant",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Merchant
}