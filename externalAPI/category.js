const axios = require('axios');
const axiosGetConfig = require('../config/axiosGetConfig');

async function CategoryCollecting() {

    let axiosConfig = axiosGetConfig({url:'/categories/'});

    let res = await axios(axiosConfig);
    let fetchData = res['data'];

}

module.exports = CategoryCollecting;