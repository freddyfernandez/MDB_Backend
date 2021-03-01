const { response } = require("express");

const Hospital = require('../Models/hospital');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find();

    //se muestra los datos json
    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async(req, res = response) => {


    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body

    });


    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error  inesperado... revisar hospital controller    '
        });


    }


}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,

}