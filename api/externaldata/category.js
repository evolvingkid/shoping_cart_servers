const express = require('express');
const router = express.Router();
const config = require('config');

const serverAuthToken = config.get('server-auth-token');
const externalcatgoryDataAcess = require('../../externalAPI/category')

router.get('/', async (req, res) => {

    const token = req.header('server-auth-token');

    if (token == undefined) {
        return res.status(401).json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    if (token != serverAuthToken) {
        return res.status(401).json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    try {
        externalcatgoryDataAcess();

        return res.json({
            sucess: true,
            message: 'category acessing compelte'
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            errors: 'Error occured',
        });

    }



});

module.exports = router;