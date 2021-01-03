//importar el .env
require('dotenv').config();

//=import express from 'express';
const express = require('express');
//contante cors
const cors = require('cors');

const { dbConexion } = require('./database/config');

//crear servidor express
const app = express();

//configurar Cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Base de datos
dbConexion();

console.log(process.env);

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);

});