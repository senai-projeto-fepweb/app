const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Ticket recuperado'
    });
});

router.post('/', (req, res, next) => {
    const ticket= {
        ticketId: req.body.ticketId,
        name:req.body.name
    }
    res.status(200).json({
        message: 'Ticket criado',
        id: ticketId
    });
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

router.patch('/:ticketId', (req, res, next) => {
    res.status(200).json({
        message: 'Ticket atualizado',

    });
});

router.delete('/:ticketId', (req, res, next) => {
    res.status(200).json({
        message: 'Ticket deletado',
        
    });
});

module.exports = router;