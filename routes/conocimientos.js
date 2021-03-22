/*
                      Ruta: /api/conocimientos

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validad-campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getConocimientos,
    crearConocimiento,
    actualizarConocimiento,
    borrarConocimiento

} = require('../Controller/conocimientosController')

const router = Router();

router.get('/',getConocimientos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre  del conocimiento es necesario').not().isEmpty(),
    validarCampos
],
crearConocimiento
);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre  del hospital es necesario').not().isEmpty(),
    validarCampos

  ],
  actualizarConocimiento
);

router.delete('/:id',
  borrarConocimiento
);

module.exports = router;