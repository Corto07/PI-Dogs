const { Dog, Temperament } = require ("../db");

const createDogs = async (req, res) => {
  const { name, image, weight, height, life_span, temperament, origin, createDb } = req.body;
  try {
    const response = await createDogDb(name, image, weight, height, life_span, temperament, origin, createDb);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDogDb = async ( name, image, weight, height, life_span, temperament, origin, createDb) => {
  const createDog = await Dog.create({ name, image, weight, height, life_span, origin, createDb});
  const temperamentDb = await Temperament.findAll({
    where: { name: temperament },
  });
  await createDog.addTemperaments(temperamentDb);
  return createDog;
}

module.exports = createDogs;