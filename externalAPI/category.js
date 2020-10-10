const axios = require('axios');
const axiosGetConfig = require('../config/axiosGetConfig');

const Category = require('../models/category');

async function CategoryCollecting() {

    try {
        // * acess from the other servers
        let axiosConfig = axiosGetConfig({ url: '/categories/' });

        let res = await axios(axiosConfig);
        let fetchData = res['data'];

        for (let value of fetchData.values()) {

            console.log(value);

            category = new Category({
                categoryID: value['categoryID'],
                categoryName: value['name'],
                imageUrl: value['image'],
            });

            await Category.createIndexes();

            await category.save();
        }

        console.log('category acess complete');
    } catch (error) {
        throw error;
    }


}

module.exports = CategoryCollecting;