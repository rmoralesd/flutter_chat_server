const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket')


//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) {
        return client.disconnect();
    }

    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    //Hay dos salas => sala global y sala privada client.id
    //Se va a crear otra sala con el uuid de la persona.
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', (payload) => {
        console.log(payload);
        io.onconnection(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        //console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('emitir-mensaje', (payload) => {
        //io.emit('nuevo-mensaje', payload); //emite a todos, incluyendo a si mismo
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);

    });

    // client.on('vote-band', (payload) => {
    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('add-band', (payload => {
    //     console.log(payload);
    //     bands.addBand(new Band(payload.name));
    //     io.emit('active-bands', bands.getBands());
    // }));

    // client.on('delete-band', (payload => {
    //     bands.deleteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // }));
});