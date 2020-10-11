const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
    styleID: { type: Number, unique: true },
    brandName: { type: String },
    styleName: { type: String },
    title: { type: String },
    description: { type: String },
    baseCategory: { type: String },
    categories: [],
    subProducts: [{
        //* also called skuID in external servers
        subProductID: { type: String },
        colorName: { type: String },
        colorHexCode: { type: String },
        frontImage: { type: String },
        backImage: { type: String },
        sideImage: { type: String },
        sizeName: { type: String },
        sizeCode: { type: String },
    }],
    newStyle: { type: Boolean },
    brandImage: { type: String },
    styleImage: { type: String },
});

module.exports = User = mongoose.model('ProductModel', ProductModel);