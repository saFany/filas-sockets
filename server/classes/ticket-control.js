const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;

        } else { //Reinicia el día
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        this.grabarArchivo();
        console.log('El sistema se ha reiniciado');
    }

    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'Ya no hay más tickets';
        }

        let numeroTicket = this.tickets[0].numero; //Extraer el número pasado por referencia
        this.tickets.shift(); //Elima la primera posición del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio); //Crear nuevo ticket atendido

        this.ultimosCuatro.unshift(atenderTicket); //Se agrega al inicio del arreglo

        if (this.ultimosCuatro.length > 4) { //Valida que no existan más de 4
            this.ultimosCuatro.splice(-1, 1); //Borra el último elemento
        }

        //console.log('Ultimos cuatro');
        //console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        let jsonDataStrig = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataStrig);

        console.log('El sistema se ha actualizado');
    }
}

module.exports = {
    TicketControl
}