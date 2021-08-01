const { io } = require('../index');


//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
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