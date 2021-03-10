const { response, request } = require('express');
const encriptacion = require('bcryptjs');
const Usuario = require('../Models/usuarios');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    //PAGINACION

    //FORMA1:
    //const usuarios = await Usuario
    //.find({}.'nombre email role google')
    //.skip(desde).limit(5);
    //const total = await Usuario.count();

    //FORMA2:
    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    //END PAGINACION

    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });

        }


        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = encriptacion.genSaltSync();
        usuario.password = encriptacion.hashSync(password, salt)


        //promesa peticion asincrona
        //await espera a que se ejecute la siguiente peticion
        await usuario.save();

        //Generar el TOKEN al crear nuevo usuario
        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error  inesperado... revisar logs'
        });


    }
}

const actualizarUsuario = async(req, res = response) => {


    //Validar  token y comprobar  si el usuario es correcto
    const uid = req.params.id;


    try {

        const UsuarioDB = await Usuario.findById(uid);

        if (!UsuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario por id'
            });

        }
        // valores exceptuados de actualizacion
        const { password, google, email, ...campos } = req.body;

        if (UsuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe  un usuario con ese Email'
                });

            }
        }
        if(!UsuarioDB.google){
            campos.email = email;
        }else if (UsuarioDB.email !==email){
            return res.status(400).json({
                ok:false,
                msg:'Usuario de google no puede cambiar de correo'
            });

        }  
      
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error  inesperado... revisar logs'
        });

    }
}


const borrarUsuario = async(req, res = response) => {

    const uid = req.param.id;
    try {

        //proceso de eliminacion
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });

        }
        await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'no se puede boorsr, hable con el administrador'
        });

    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}