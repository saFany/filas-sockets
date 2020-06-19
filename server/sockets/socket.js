const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', function(data, callback) {
        let siguiente = ticketControl.siguiente();
        console.log('El siguiente ticket es: ' + siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });


    client.on('atenderTicket', function(data, callback) {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio no fue proporcionado'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //actualizar/notificar la pantalla pública
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });
    });
});