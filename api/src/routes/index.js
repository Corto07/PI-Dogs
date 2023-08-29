const { Router } = require('express');
const getDogsById = require('../controllers/getDogsById');
const getDogsByName = require('../controllers/getDogsByName');
const getDogsTemp = require('../controllers/getDogsTemp');
const createDogs = require ("../controllers/createDogs");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get ('/dogs/:idRaza', getDogsById);
router.get ('/dogs', getDogsByName);
router.get ('/temperaments', getDogsTemp);
router.post ('/dogs', createDogs);

module.exports = router;
