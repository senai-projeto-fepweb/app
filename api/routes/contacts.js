/*************************************
 *              IMPORTS
 *************************************/
const express = require('express');
const config = require('../../config');
const Freshdesk = require('freshdesk-api');

/*************************************
 *              INIT
 *************************************/
const router = express.Router();
const freshdesk = new Freshdesk(stringConnection, apiKey);

/*************************************
 *              GET
 *************************************/
router.get('/', (req, res, next) => {
    freshdesk.listAllContacts({
        email: 'norman.jones@freshdesk.com'
    }, function (err, data, extra) {
        console.log(err || data);
        if (err) {
            res.status(500).json({
                message: 'Ocorreu um erro ao tentar recuperar os contatos'
            });
        } else {
            res.status(200).json({
                message: 'Contato recuperado',
                id: data[0]['id']
            });
        }
    });
    
});

/*************************************
 *              POST
 *************************************/
/*************************************
 *              PATCH
 *************************************/
/*************************************
 *              DELETE
 *************************************/

module.exports = router;