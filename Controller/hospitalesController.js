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

const actualizarHospital = async(req, res = response) => {
    const idHospital=req.params.id;
    const uid= req.uid;
    try {

        const hospital = await Hospital.findById(idHospital);
        
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado por id',
            })
        }

        const cambioHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalesActualizado = await Hospital.findByIdAndUpdate(idHospital,cambioHospital,{new: true}); 

        res.json({
            ok: true,
            msg: 'actualizarHospitales',
            hospital: hospitalesActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

const borrarHospital = async(req, res = response) => {

    const idHospital=req.params.id;

    try {

        const hospital = await Hospital.findById(idHospital);
        
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado por id',
            })
        }

        await Hospital.findByIdAndDelete(idHospital);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado',
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,

}