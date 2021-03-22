//importar el .env
require('dotenv').config();

const path = require('path');

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

//Directorio publico
app.use(express.static('public'));

console.log(process.env);

//Rutas de las apis
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/conocimientos', require('./routes/conocimientos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/upload'));

//lo ultimo
app.get('*',(req,resp)=>{
     resp.sendFile(path.resolve(__dirname,'public/index.html'));
})


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);

});