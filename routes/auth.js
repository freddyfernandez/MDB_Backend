/*
   Path: 'api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renewToken } = require('../Controller/authController');
const { validarCampos } = require('../middlewares/validad-campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    //midleware para vaidacion de campos
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login
)
router.post('/google',
    //midleware para vaidacion de campos
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
)
router.get('/renew',
    validarJWT,
    renewToken
)

module.exports = router;