/*
   Path: 'api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../Controller/authController');
const { validarCampos } = require('../middlewares/validad-campo');

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

module.exports = router;