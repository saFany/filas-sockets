//comando para establecer la comunicación
var socket = io();
var searchParams = new URLSearchParams(window.location.search);
let t_atendido = $('#t_atendido');

var label = $("#lblNuevoTicket");
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});



if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('#n_escritorio').text(escritorio);

$('#atender').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'Ya no hay más tickets') {
            t_atendido.text(resp);
            alert(resp);
            return;
        }
        t_atendido.text('Ticket: ' + resp.numero);

    });
});