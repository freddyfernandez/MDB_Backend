const { response } = require('express');
const encriptacion = require('bcryptjs');
const Usuario = require('../Models/usuarios');

const login = async(req, res = response) => {

    //instanciamos requerimientos de campos
    const { email, password } = req.body;


    try {

        //verificar un email correcto
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            });
        }


        //verificar contraseña: con compare asyn
        const validaPassword = encriptacion.compareSync(password, usuarioDB.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'constraseña no valida'
            });
        }

        //Generar el TOKEN
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

module.exports = {
    login,

}