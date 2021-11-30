const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const mensaje = require('../models/mensaje');

const usuarioConectado = async(uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async(uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;
}

const grabarMensaje = async(payload) => {
    /*
    {
        de:''.
        para:''.
        texto:''
    }
    */
    try {
        const Mensaje = new Mensaje()
        await mensaje.save();
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}