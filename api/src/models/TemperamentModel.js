const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    
  sequelize.define('Temperament', {
    id: {
      type :DataTypes.INTEGER,
      primaryKey   : true ,
      autoIncrement  :true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {timestamps: false}
)};