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
//Base de datos
dbConexion();

console.log(process.env);


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);



});