const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcrypt');
const User = require('../../models/users');

const serverAuthToken = config.get('server-auth-token');
const saltRounds = config.get('password-salt-round');

// * email and password user sigin


// * email and password user creation
router.post('/', [
    check('password', 'Password is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
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
        let { email, password, name } = req.body;

        let hashPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
            name: name,
            password: hashPassword,
            email: email,
        });

        await user.save();

        return res.status(201).json({
            sucess: true,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            errors: 'Error occured',
        });

    }
});

module.exports = router;