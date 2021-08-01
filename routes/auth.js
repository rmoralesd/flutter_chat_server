/*
    path: api/login
*/
const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    check('email', 'El email está mal').isEmail(),
    validarCampos
], crearUsuario);

module.exports = router;