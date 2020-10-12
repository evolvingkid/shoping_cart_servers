const User = require('../models/users');

async function userCreation(params) {
    // * for creating new users for external signin
    user = new User({
        name: params.name,
        password: null,
        email: params.email,
        isEmailVerified : false,
        isExternalLogin: true
    });

    await User.createIndexes();

    await user.save();

    return [user];
}

module.exports = userCreation;