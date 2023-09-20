const axios = require ("axios")
require('dotenv').config();
const { Temperament } = require ("../db");

const URL_BASE = 'https://api.thedogapi.com/v1/breeds/';
const { API_KEY } = process.env;

const getDogsTemp = async (req, res) => {

  // Trae los datos de la API
  const resultado = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
  const temperaments = resultado.data.map(el => el.temperament);
  const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
 //uno cadenas y separo por comas    
//  const dataTemperament = temperaments.join().split(',')
 //elimino espacios en blanco a c/lado
//  dataTemperament = dataTemperament.map( el => el.trim());
 
 //agrego los tempaeramentos a la base de datos
//  dataTemperament.forEach (el => {
//    let i =  el.trim()
//       Temperament.findOrCreate({
//           where: { name: i }    
  })
});

//traigo todos los nombres del modelo
  try {
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = getDogsTemp;











// const getAllTemp = async () => {
//   // Trae los datos de la API
//   try {
//   const resultado = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
//   const dogData = resultado.data;
  
//   // SET. Crea un nuevo objeto sin valores duplicador
//   const temperaments = new Set();
//   // Se recorre el array y se divide en una matriz utilizando split y se agrega al SET 
//   dogData.forEach(dog => {
//     if (dog.temperament) {
//       dog.temperament.split(', ').forEach(temp => temperaments.add(temp));
//     }
//   });
//   // Toma todos los elementos de Set y los guarda en un array para dividirlos y guardarlos en la Base de datos.
//   const uniqueTemperaments = Array.from(temperaments);
  
//   // recibe un array de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en el array se han resuelto
//   const createdTemperaments = await Promise.all(uniqueTemperaments.map(temp => {
//     return Temperament.findOrCreate({ where: { name: temp } });
//   }));
// // devuelve los objetos con el valor temperamento
//   return createdTemperaments.map(([temperament]) => temperament);

// } catch (error) {
//   throw new Error("Error al obtener y guardar temperamentos: " + error.message);
// }
// }

// module.exports = getDogsTemp;