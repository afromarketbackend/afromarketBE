const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Review extends Model {
    static associate(models){
      this.belongsTo(models.Product, {as: 'Product'}),
      this.belongsTo(models.User, {as:'User'})
    }
  }
  Review.init(
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
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 3
      },
      product_owner_id:{
        type: DataTypes.STRING
      },
      merchant_id:{
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Review",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Review
}