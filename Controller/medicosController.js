const { response } = require("express");
const Medico = require('../Models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        ///
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error  inesperado... revisar medico controller    '
        });
    }


}

const actualizarMedico = async(req, res = response) => {

    const idMedico=req.params.id;
    const uid= req.uid;
    try {

        const medico = await Medico.findById(idMedico);
        
        if(!medico){
            return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado por id',
            })
        }

        const cambioMedico = {
            ...req.body,
            usuario: uid
        }

        const medicosActualizado = await Medico.findByIdAndUpdate(idMedico,cambioMedico,{new: true}); 

        res.json({
            ok: true,
            msg: 'actualizarMedicos',
            medico: medicosActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

const borrarMedico = async(req, res = response) => {

    const idMedico=req.params.id;

    try {

        const medico = await Medico.findById(idMedico);
        
        if(!medico){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id',
            })
        }

        await Medico.findByIdAndDelete(idMedico);

        res.json({
            ok: true,
            msg: 'Medico Eliminado',
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getMedicoById = async(req, res = response) => {

    const id = req.params.id;
    try {

        const medico = await Medico.findById(id).populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            medico
        })
        
    } catch (error) {

        console.log(error);
        res.json({
            ok: false,
            msg:'hable con el administrador'
        })
        
    }
   
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
    
}