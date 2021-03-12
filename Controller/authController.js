/*
   PATH: '/api/login'
*/
const { response } = require('express');
const encriptacion = require('bcryptjs');
const Usuario = require('../Models/usuarios');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google_verify');
const { getMenuFrontend } = require('../helpers/menu_frontend');

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
            token,
            menu: getMenuFrontend(usuarioDB.role)

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

const googleSingIn = async(req,res=response)=>{
    const googleToken=req.body.token;
    try {
        //DESTRUCTURANDO UNA FUNCION CON CONST: await googleVerify(googleToken);
        const{name,email,picture} = await googleVerify(googleToken);

        const usuarioDB= await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){

            usuario=new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })

            
        }else{
            usuario=usuarioDB;
            usuario.google = true;

        }

        //guardar en la base de datos
        await usuario.save( );
        //Generar el TOKEN
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok:true,
            token,
            menu: getMenuFrontend(usuario.role)
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'token no es correcto  '
        })
    }

    
    
}

const renewToken = async(req,res=response)=>{
    const uid=req.uid;
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    res.json({
        ok:true,
        token,
        usuario,
        menu: getMenuFrontend(usuario.role)
    });     
}






module.exports = {
    login,
    googleSingIn,
    renewToken

}