const axios = require('axios');
const axiosGetConfig = require('../config/axiosGetConfig');
const acessSubProducts = require('./subProducts');

const Product = require('../models/product');

async function ProductCollecting() {

    // * acess from the other servers
    console.log('product acessing started');
    let axiosStyleConfig = axiosGetConfig({ url: '/styles/' });
    let res = await axios(axiosStyleConfig);
    let fetchStyleData = res['data'];

    for (let value of fetchStyleData.values()) {

        console.log(`product ${value['title']} of ${value['brandName']}  extracted`);

        let listOfCatgory = value['categories'].split(',')

        let subProductsData = await acessSubProducts({productID : value['styleID']});

        product = new Product({
            styleID: value['styleID'],
            brandName: value['brandName'],
            styleName: value['styleName'],
            title: value['title'],
            description: value['description'],
            baseCategory: value['baseCategory'],
            newStyle: value['newStyle'],
            categories : listOfCatgory,
            subProducts : subProductsData,
            brandImage: value['brandImage'],
            styleImage: value['styleImage'],
        });

        await Product.createIndexes();

        await product.save();
    }
    console.log('product acessing ended');
}


module.exports = ProductCollecting;