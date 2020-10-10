const mongoose = require('mongoose');

const CategoryModel = new mongoose.Schema({
    categoryID: { type: Number , unique: true},
    categoryName: { type: String },
    imageUrl: { type: String },
});

module.exports = User = mongoose.model('CategoryModel', CategoryModel);