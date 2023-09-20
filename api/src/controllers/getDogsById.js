const axios = require ("axios")
require('dotenv').config();
const { Dog, Temperament } = require ("../db");

const URL_BASE = 'https://api.thedogapi.com/v1/breeds/';
const URL_IMG = "https://cdn2.thedogapi.com/images/";
const { API_KEY } = process.env;

const getDogsById = async (req, res) => {
    
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  const dog = allDogs.filter(el => el.id == idRaza);
  if (dog.length) {
      res.status(200).json(dog);
  }else{
      res.status(404).send("Perro no encontrado");
  }
};

const getAllDogs = async () => {
  const dataFromApi = await getApiData();
  const dataFromDb = await getFromDb();
  // const allDataMixed = dataFromApi.concat(dataFromDb);
  const allDataMixed = [...dataFromApi, ...dataFromDb];
  return allDataMixed;
}

const getFromDb = async () => {
  const dogsFromDb =  await Dog.findAll({
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

module.exports = getDogsById;