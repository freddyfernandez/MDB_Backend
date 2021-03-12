/*
                      Ruta: /api/hospitales

*/

 const { Router } = require('express');
 const { check } = require('express-validator');

 const { validarCampos } = require('../middlewares/validad-campo');

 const { validarJWT } = require('../middlewares/validar-jwt');

 const {
     getHospitales,
     actualizarHospital,
     crearHospital,
     borrarHospital
 } = require('../Controller/hospitalesController')

 const router = Router();

 router.get('/', getHospitales);

 router.post('/', [
         validarJWT,
         check('nombre', 'El nombre  del hospital es necesario').not().isEmpty(),
         validarCampos
     ],
     crearHospital
 );

 router.put('/:id', [
       validarJWT,
       check('nombre', 'El nombre  del hospital es necesario').not().isEmpty(),
       validarCampos

     ],
     actualizarHospital
 );

 router.delete('/:id',
     borrarHospital
 );



 module.exports = router;