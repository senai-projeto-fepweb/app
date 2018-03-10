const express = require('express'); //Facilita fazer o controller
const app = express();
const Freshdesk = require('freshdesk-api')
const freshdesk = new Freshdesk('https://fepweb-senai.freshdesk.com/', 'tOOX5OT3UnwJdUQhwJV');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const ticketsRoutes = require('./api/routes/tickets')// Rota para o ticket

app.use(morgan('dev')); // Para log no terminal
app.use(bodyParser.urlencoded({ extended: false })) //Para "encodar" body as URl
app.use(bodyParser.json());

app.use('/tickets', ticketsRoutes);

//Resposta do Server OK
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works'
    });
});

//Resposta do Server não encontrado
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//Resposta do Server qualquer outro erro
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        erro: {
            message: error.message
        }
    })
})


/*
/*Create Ticket
freshdesk.createTicket({
    name: 'Elivelton ticket',
    email: 'test@test.com',
    subject: 'Test Ticket',
    description: 'Preciso de um chatbot na minha maquina',
    status: 2,
    priority: 1
}, function (err, data) {
    console.log(err || data)
})
*/

//Update Ticket
/*
freshdesk.updateTicket(4, {
    description: 'Elivelton fez outra alteração',
    status: 2,
    priority: 3
}, function (err, data, extra) {
    console.log(err || data)
})
*/

//Get a Ticket

// freshdesk.getTicket(4, function (err, data, extra) {
//     console.log(err || data.requester)
// })

//Delete a Ticket
/*
freshdesk.deleteTicket(5, function (err, data, extra) {
    console.log(err || data)
})*/

//  freshdesk.listAllTickets({
//      requester_id: 1 
//  },function (err, data, extra) {
//      console.log(err || data)
//  })

module.exports = app;