const mongoose = require('mongoose');

const UsersModel = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    address: {
        country: { type: String },
        administartion: { type: String },
        subadministration: { type: String },
        postalcode: { type: Number },
        place: { type: String },
    },
    order: {},
});

module.exports = User = mongoose.model('UsersModel', UsersModel);