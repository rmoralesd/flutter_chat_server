const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    //El parámetro desde llega en la url del request, y se transforma a valor numérico

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)

    res.json({
        ok: true,
        usuarios
    })
}

module.exports = {
    getUsuarios
}