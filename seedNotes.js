/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Notes = require('./database'); // Importa el modelo de Notas
const data = require('./notes.json');

// add .env support
require('dotenv').config();


const {MONGO_DB_USR, MONGO_DB_PWD, MONGO_DB_HOST, MONGO_DB_PORT} =
  process.env;
const credentials = MONGO_DB_USR ? `${MONGO_DB_USR}:${MONGO_DB_PWD}@` : '';
const mongoURI = `mongodb://${credentials}${MONGO_DB_HOST}:${MONGO_DB_PORT}/`;

console.log(MONGO_DB_HOST);

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Borra todos los documentos existentes en la colección 'notes'
    await Notes.deleteMany({});

    // Inserta los datos de 'notes.json' en la base de datos utilizando
    // el modelo Notes
    await Notes.insertMany(data);

    console.log('Carga de datos de prueba completa!');
    console.log('Por favor, refresca la página.');

    // Cierra la conexión a la base de datos
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al cargar los datos de prueba:', error);
  }
};

seedDatabase();
