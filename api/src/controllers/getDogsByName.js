const axios = require ("axios")
require('dotenv').config();
const { Dog, Temperament } = require ("../db")

const URL_BASE = 'https://api.thedogapi.com/v1/breeds/';
const {API_KEY} = process.env;

const getDogsByName = async (req, res) => {
  const { name } = req.query;
  try {
    if(name){
      // Muestre el perro encontrado con la descripcion
      const dogsByName = await getDogByName(name)
      // Si el perro no se encuentra guardado. Mensaje de no encontrado
      if (dogsByName.length === 0) {
        return res.status(404).json({ message: `Sorry, Not Found the race ${name}`});
      }
      res.status(200).json(dogsByName)
    } else {
      // Muestre todos los perros
      const response = await getAllDogs()
      res.status(200).json(response)
    }
  } catch (error) { 
    res.status(400).json({error: error.message});
  }
};

const infoDogs = (array) => { 
  return array.map((dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weight: dog.weight && dog.weight.metric,
    height: dog.height && dog.height.metric, 
    life_span: dog.life_span && dog.life_span,
    temperament: dog.temperament
      ? dog.temperament
      : "🐶 Sin temperamentos",
    image: dog.image.url,
    origin: dog.origin
      ? dog.origin
      : "🐶 Origen desconocido",
    createDb: false,
  };
});
};

const getAllDogs = async () => {
  // Funcion que busca en la base de datos
  const dogsDB = await Dog.findAll({ 
    include: {
      model: Temperament,
      attributes: ["name"],
        through: {
          attributes: [],
        },
      }
  });
  // Trae los datos de la API
  const dogsApi = (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;
  // Funcion que devuelve el array completo
  const dogsByApi = infoDogs (dogsApi)
  // Retorno todos los perros encontrados en la API y en la DB
  return [...dogsDB,...dogsByApi]
}

const getDogByName = async (name) => {
  // Trae los datos de la API
  const dogsApi = (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;
  // Funcion que devuelve el array completo
  const dogsByApi = infoDogs (dogsApi)
  // Funcion que Fitrar desde el array que viene de la API - Sin distincion de Minuscula o Mayuscula
  const dogFilterApi = dogsByApi.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
  // Funcion que Busca y Fitrar desde la base de Datos
  const dogFilterDB = await Dog.findAll({ 
    include: {
      model: Temperament,
      attributes: ["name"],
        through: {
          attributes: [],
        },
      }
  });
  const dogsNameDb = dogFilterDB.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
  // Retorno la data del perro encontrado ya sea en la API o en la DB
  return [...dogFilterApi,...dogsNameDb]
}

module.exports = getDogsByName;