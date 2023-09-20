const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type :DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.STRING),//al enviar los datos por medio del body se hace con un array
      allowNull: false
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    life_span: {
      type:DataTypes.STRING,
      allowNull: false
    },
    createDb: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
   }, {timestamps: false}
)};
