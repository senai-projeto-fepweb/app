const express = require('express');
const router = express.Router();
const Freshdesk = require('freshdesk-api');
const config = require('./config');

const freshdesk = new Freshdesk(stringConnection, apiKey);

//Lista todos os tickets
router.get('/', (req, res, next) => {
    freshdesk.listAllTickets({

    }, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Listar todos tickets',
            body: data
        });
    })
});

//Listar apenas um ticket especifico
router.get('/:ticketId', (req, res, next) => {
    var ticketId = req.params.ticketId
    freshdesk.getTicket(ticketId, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket recuperado',
            body: data
        });
    })

});

//Criar um Ticket
router.post('/', (req, res, next) => {
    freshdesk.createTicket({
        name: 'Elivelton ticket',
        email: 'test@test.com',
        subject: 'Criando Ticket com o Node.JS',
        description: 'Por favor, providenciar um chatbot URGENET',
        status: 2,
        priority: 4
    }, function (err, data) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket criado',
            id: data.id
        });
    })

});

router.post('/:ticketId', (req, res, next) => {
    id = req.params.ticketId;

    if (id === '1')
        res.status(200).json({
            message: 'Esse ticket prioritario',
            id: ticketId
        });
    else {
        res.status(200).json({
            message: 'Ticket normal',
            id: id
        });
    }
}
);

//Alteração de Ticket
router.patch('/:ticketId', (req, res, next) => {
    const ticketId = req.params.ticketId
    freshdesk.updateTicket(ticketId, {
        description: 'Feita uma alterção fez outra alteração',
        status: 2,
        priority: 3
    }, function (err, data, extra) {
        console.log(err || data)
    })
    res.status(200).json({
        message: 'Ticket atualizado',
    });
});


router.delete('/:ticketId', (req, res, next) => {
    const ticketId = req.params.ticketId

    reshdesk.deleteTicket(ticketId, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket deletado',

        });
    })
    
});

module.exports = router;