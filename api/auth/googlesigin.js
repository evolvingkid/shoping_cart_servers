require('dotenv').config()

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/users');
const userCreationForExtrnal = require('../../functions/externaluserCreation');

const serverAuthToken = config.get('server-auth-token');

router.post('/', [
    check('email', 'name is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

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

        let { email, name } = req.body;
        let userDatabase = await User.find({ email: email });

        if (userDatabase[0] === undefined) {
            userDatabase = await userCreationForExtrnal({ email: email, name: name });
        }

        const username = { email: email, password: '' };
        const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

        return res.json({
            sucess: true,
            data:
            {
                user: userDatabase[0],
                acesstoken: acessToken
            }
        });

    } catch (error) {
        return res.status(500).json({ errors: 'Error occured' });
    }


});
module.exports = router;