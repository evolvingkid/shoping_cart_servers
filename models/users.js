const mongoose = require('mongoose');

const UsersModel = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    isEmailVerified: { type: Boolean },
});

module.exports = User = mongoose.model('UsersModel', UsersModel);