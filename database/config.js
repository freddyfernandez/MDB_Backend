const mongoose = require('mongoose');

//crear el servidor express
const dbConexion = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        });

        console.log('db online: ' + process.env.DB_CNN);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB, ver logs');

    }
}

module.exports = {
    dbConexion

}