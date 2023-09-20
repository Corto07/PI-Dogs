const axios = require ("axios")
require('dotenv').config();
const { Dog, Temperament } = require ("../db")

const URL_BASE = 'https://api.thedogapi.com/v1/breeds/';
const {API_KEY} = process.env;

const getDogsByName = async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAllDogs()
  try {
    if(name){
      const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros.
      // Si el perro no se encuentra guardado. Mensaje de no encontrado
      dog.length
        ? res.status(200).json(dog)
        : res.status(404).json({ message: `Lo siento, No se encontro la raza ${name}`});
      } else {
        res.status(200).json(allDogs)
      }
  } catch (error) { 
    res.status(400).json({error: error.message});
  }
};

const getApiData = async() => {
    
  const apiData = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
  const apiInfo = await apiData.data.map(dog => {
  let temperamentArray = [];
  if (dog.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
      temperamentArray = dog.temperament.split(", ");
  }
  let heightArray = [];
    if (dog.height.metric) {
        heightArray = dog.height.metric.split(" - ");
    }

    let weightArray = [];
    if (dog.weight.metric) {
        weightArray = dog.weight.metric.split(" - ");
    }
  return {
        id: dog.id,
        name: dog.name,
        height: heightArray,
        weight: weightArray,
        life_span: dog.life_span,
        temperaments: temperamentArray,
        image: dog.image.url,
        createDb: false,
      }
  })
      return apiInfo;
}

//-- Get data from the database posgrest--//
const getFromDb = async () => {
  const dogsFromDb = await Dog.findAll({
      include: {
          model: Temperament,
          attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
          through: {
              attributes: [],//traer mediante los atributos del modelo
          },
      }
  })

  const transformedDogs = dogsFromDb.map(dog => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperaments: dog.Temperaments.map(temp => ({ name: temp.name })),
      image: dog.image,
      createDb: dog.createDb
    };
  });

  return transformedDogs;
};


//combine data from API and database
const getAllDogs = async () => {
  const dataFromApi = await getApiData();
  const dataFromDb = await getFromDb();
  // const allDataMixed = dataFromApi.concat(dataFromDb);
  const allDataMixed = [...dataFromDb, ...dataFromApi];
  return allDataMixed;
}

module.exports = getDogsByName;