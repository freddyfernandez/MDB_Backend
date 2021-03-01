const { response } = require("express");

const Usuario = require('../Models/usuarios');
const Hospital = require('../Models/hospital');
const Medico = require('../Models/medico');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex=new RegExp(busqueda,'i')
    
    const usuarios= await Usuario.find({nombre:regex});
    const hospitales= await Hospital.find({nombre: regex})
    const medicos= await Medico.find({nombre: regex})
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex=new RegExp(busqueda,'i')

    let data = [];

    switch (tabla) {
        case 'medicos':
            //POPULATE: ES UN JQUERY PARA HACER CONSULTAS POR FILTRADO DE DATOS
            data = await Medico.find({nombre: regex}).populate('usuario','nombre img')
                                               .populate('hospital','nombre img'); 
            break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex}).populate('usuario','nombre img');
            
            break;
        case 'usuarios':
            data =await Usuario.find({nombre:regex});
            
            break;    
    
        default:
            //SI EL NOMBRE DE LA RUTA NO ES CORRECTO  
            return res.status(400).json({
                ok:false,
                msg:'la tabla deber ser de medicos o usuarios o hospitales'
            });
            
    }

    res.json({
        ok:true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}