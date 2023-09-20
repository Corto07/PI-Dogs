const { Dog, Temperament } = require ("../db");

const createDogs = async (req, res) => {

  const { name, image, weight_min, weight_max, height_min, height_max, life_span, temperaments, createDb } = req.body;
  try {
    const response = await createDogDb(name, image, weight_min, weight_max, height_min, height_max, life_span, temperaments, createDb);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDogDb = async ( name, image,weight_min, weight_max, height_min, height_max, life_span, temperaments, createDb) => {
  
  const fixedHeight = []
  const minHeight = height_min;
  const maxHeight = height_max;
  fixedHeight.push(minHeight, maxHeight)
 
  const fixedWeight = []
  const minWeight = weight_min;
  const maxWeight = weight_max;
  fixedWeight.push(minWeight, maxWeight)
  
  const createDog = await Dog.create({ 
    name,
    height: fixedHeight,
    weight: fixedWeight,
    life_span,
    image,
    createDb,
  });
  

  const temperamentDb = await Temperament.findAll({
    where: { name: temperaments },
  });
  
  await createDog.addTemperament(temperamentDb);
  return createDog;

}





// ----------------------------------------------------------------------------------------
// const {
//   name,
//   height_min,
//   height_max,
//   weight_min,
//   weight_max,
//   life_span,
//   temperaments,
//   image
//  } = req.body

//  const fixedHeight = []
//  const minHeight = height_min;
//  const maxHeight = height_max;
//  fixedHeight.push(minHeight, maxHeight)

//  const fixedWeight = []
//  const minWeight = weight_min;
//  const maxWeight = weight_max;
//  fixedWeight.push(minWeight, maxWeight)

//  let dog = await Dog.create({
//   name,
//   height: fixedHeight,
//   weight: fixedWeight,
//   life_span,
//   image,
//  })

//  const temp = await Temperament.findAll({
//      where: { temperaments: name},
//  })

//  dog.addTemperament(temp);

//  res.status(200).send("El perro se creo satisfactoriamente")

// -------------------------------------------------------------------------------------

//     const { name, image, weight_min, weight_max, height_min, height_max, life_span, temperaments, createDb } = req.body;
//   try {
//     const response = await createDogDb(name, image, weight_min, weight_max, height_min, height_max, life_span, temperaments, createDb);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const fixedHeight = []
//    const minHeight = height_min;
//    const maxHeight = height_max;
//    fixedHeight.push(minHeight, maxHeight)

//    const fixedWeight = []
//    const minWeight = weight_min;
//    const maxWeight = weight_max;
//    fixedWeight.push(minWeight, maxWeight)

// const createDogDb = async ( name, weight_min, weight_max, height_min, height_max, life_span, temperaments,) => {
//   const createDog = await Dog.create({ name, image, height: fixedHeight, weight: fixedWeight, life_span, createDb});
  
//   const temperamentDb = await Temperament.findAll({
//     where: { name: temperaments },
//   });
//   await createDog.addTemperament(temperamentDb);
//   return createDog;
// }

module.exports = createDogs;