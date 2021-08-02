/*
    path: api/login
*/
const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    check('email', 'El email está mal').isEmail(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    check('email', 'El email está mal').isEmail(),
    validarCampos
], login);

module.exports = router;