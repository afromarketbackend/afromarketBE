const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Rate extends Model {
    static associate(models){
    }
  }
  Rate.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      country: {
        type: DataTypes.STRING
      },
      state: {
        unique: true,
        type: DataTypes.STRING,
      },
      region:{
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      currency:{
        type: DataTypes.STRING,
        allowNull: true
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Rate",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Rate
}