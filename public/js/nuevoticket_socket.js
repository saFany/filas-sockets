//comando para establecer la comunicación
var socket = io();
var label = $("#lblNuevoTicket");
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});

socket.on('estadoActual', function(resp) {
    label.text('El siguiente es: ' + resp.actual);
});

$('#nuevo_boton').on('click', function() {
    socket.emit('siguienteTicket', null, function(resp) {
        label.text('El siguiente es: ' + resp);
        console.log('El siguiente ticket es: ' + resp);
    });

});