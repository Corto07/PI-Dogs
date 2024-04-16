const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require ("axios")
// const cors = require('cors');

require('./db.js');

const server = express();

server.name = 'API';

// server.use(cors({
//   origin: 'https://pi-dogs-two-silk.vercel.app', // Reemplaza esto con la URL de tu frontend en Vercel
//   optionsSuccessStatus: 200 // Algunos navegadores antiguos no envían el encabezado CORS preflight OPTIONS, por lo que esta es la opción para que los navegadores los manejen como solicitudes exitosas
// }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pi-dogs-two-silk.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes - ACCEDE A LAS RUTAS
server.use(routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
