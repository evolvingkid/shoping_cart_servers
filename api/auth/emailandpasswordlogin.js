require('dotenv').config()

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');


const serverAuthToken = config.get('server-auth-token');

router.post('/', [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'name is required').not().isEmpty(),
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
        let { email, password } = req.body;
        const userDatabase = await User.find({ email: email });
        let hashpassword = userDatabase[0]['password'];

        // * decripting password
        bcrypt.compare(password, hashpassword, function (err, result) {

            if (!result) {
                return res.status(403).json({ errors: 'User credentials is wrong' });
            }

            // * for JWT token
            const username = { email: userDatabase[0]['email'], password: userDatabase[0]['password'] };
            const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

            return res.json({
                sucess: true,
                data:
                {
                    user: userDatabase[0],
                    acesstoken: acessToken
                }
            });

        });
    } catch (error) {
        return res.status(500).json({ errors: 'Error occured' });
    }
});

module.exports = router;