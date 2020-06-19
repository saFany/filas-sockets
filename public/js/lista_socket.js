//comando para establecer la comunicación
var socket = io();
var lbl1 = $("#lblTicket1");
var lbl2 = $("#lblTicket2");
var lbl3 = $("#lblTicket3");
var lbl4 = $("#lblTicket4");

var lble1 = $("#lblEscritorio1");
var lble2 = $("#lblEscritorio2");
var lble3 = $("#lblEscritorio3");
var lble4 = $("#lblEscritorio4");

var lblTickets = [lbl1, lbl2, lbl3, lbl4];
var lblEscritorios = [lble1, lble2, lble3, lble4];

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});

socket.on('estadoActual', function(data) {
    actualizaLista(data.ultimosCuatro);
});

socket.on('ultimosCuatro', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaLista(data.ultimosCuatro);
});

function actualizaLista(lista) {
    for (let i = 0; i < lista.length; i++) {
        lblTickets[i].text('Ticket ' + lista[i].numero);
        lblEscritorios[i].text('Escritorio ' + lista[i].escritorio);

    }
}