const { response } = require("express");
const Conocimiento = require("../Models/conocimiento");

const getConocimientos = async(req, res = response) => {

    const conocimientos = await Conocimiento.find();

    //se muestra los datos json
    res.json({
        ok: true,
        conocimientos
    })
}

const crearConocimiento = async(req, res = response) => {


    const uid = req.uid;
    const conocimiento = new Conocimiento({
        usuario: uid,
        ...req.body

    });


    try {
        const conocimientoDB = await conocimiento.save();
        res.json({
            ok: true,
            conocimiento: conocimientoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error  inesperado... revisar conocimiento controller    '
        });


    }


}

const actualizarConocimiento = async(req, res = response) => {
    const idConocimiento=req.params.id;
    const uid= req.uid;
    try {

        const conocimiento = await Conocimiento.findById(idConocimiento);
        
        if(!conocimiento){
            return res.status(404).json({
                ok:true,
                msg: 'Conocimiento no encontrado por id',
            })
        }

        const cambioConocimiento = {
            ...req.body,
            usuario: uid
        }

        const conocimientosActualizado = await Conocimiento.findByIdAndUpdate(idConocimiento,cambioConocimiento,{new: true}); 

        res.json({
            ok: true,
            msg: 'actualizarHospitales',
            conocimiento: conocimientosActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

const borrarConocimiento = async(req, res = response) => {

    const idConocimiento=req.params.id;

    try {

        const conocimiento = await Conocimiento.findById(idConocimiento);
        
        if(!conocimiento){
            return res.status(404).json({
                ok:true,
                msg: 'Conocimiento no encontrado por id',
            })
        }

        await Conocimiento.findByIdAndDelete(idConocimiento);

        res.json({
            ok: true,
            msg: 'Conocimiento Eliminado',
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

module.exports ={
    getConocimientos,
    crearConocimiento,
    actualizarConocimiento,
    borrarConocimiento
}