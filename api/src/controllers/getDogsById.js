const axios = require ("axios")
require('dotenv').config();
const { Dog, Temperament } = require ("../db");

const URL_BASE = 'https://api.thedogapi.com/v1/breeds/';
const URL_IMG = "https://cdn2.thedogapi.com/images/";
const { API_KEY } = process.env;

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  const source = isNaN(idRaza) ? "bdd" : "api"
    // soures es "bdd" si el resultado es: 29fe4e09-e43e-4f94-a0a8-ac50bba076b6
    // source es "api" si el resultado es: 4
  try {
    const response = await getDogById( idRaza, source );
    if (!response || idRaza > 264) {
      return res.status(404).json({ error: `Race with Id ${idRaza} Not Found` }); 
    } else {
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    image: `${URL_IMG}` + dog.reference_image_id + ".jpg",
    origin: dog.origin
      ? dog.origin
      : "🐶 Origen desconocido",
    createDb: false,
  };
  });
};
  
const getDogById = async (idRaza, source) => {
  const getInfoDog = source === "api" 
    ? (await axios.get(`${URL_BASE}${idRaza}?api_key=${API_KEY}`)).data
    : await Dog.findByPk(idRaza, {
      include: {
        model: Temperament,
        attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      });
  return source === "api" ? infoDogs([getInfoDog])[0] : getInfoDog;
     
}

module.exports = getDogsById;