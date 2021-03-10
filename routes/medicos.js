 /*
                            Ruta: /api/medicos

                            */

 const { Router } = require('express');
 const { check } = require('express-validator');

 const { validarCampos } = require('../middlewares/validad-campo');

 const { validarJWT } = require('../middlewares/validar-jwt');

 const {
     getMedicos,
     actualizarMedico,
     crearMedico,
     borrarMedico,
     getMedicoById
 } = require('../Controller/medicosController')

 const router = Router();

 router.get('/', getMedicos);

 router.post('/', [
         validarJWT,
         check('nombre', 'El nombre  del medico es necesario').not().isEmpty(),
         check('hospital', 'El hospital id debe ser  valido').isMongoId(),
         validarCampos
     ],
     crearMedico
 );
// DESPUES DE USAR EL CONTROLADOR REALIZAR ESTA VALIDACION DE CAMPOS PARA LA RUTA /:id
 router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre  del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser  valido').isMongoId(),
    validarCampos
 ],
     actualizarMedico
 );

 router.delete('/:id',
     validarJWT,
     borrarMedico
 );

 router.get('/:id',validarJWT,getMedicoById)



 module.exports = router;