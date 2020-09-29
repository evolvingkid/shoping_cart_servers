const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
var admin = require("firebase-admin");
const adminSdk = require('../../config/firebaseadminsdk');
const bcrypt = require('bcrypt');
const User = require('../../models/users');

const serverAuthToken = config.get('server-auth-token');
const saltRounds = config.get('password-salt-round');

router.post('/', [
    check('password', 'Password is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('email', 'name is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }

    const token = req.header('server-auth-token');

    if (token == undefined) {
        return res.json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    if (token != serverAuthToken) {
        return res.json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    let { email, password, name } = req.body;

    let hashPassword = await bcrypt.hash(password, saltRounds);

    user = new User({
        name: name,
        password: hashPassword,
        email: email,
        address: {
            country: null,
            administartion: null,
            subadministration: null,
            postalcode: null,
            place: null,
        },
        order: null
    });

    await user.save();

    return res.json({
        sucess: true,
        data: user
    });

});

module.exports = router;