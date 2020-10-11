const axios = require('axios');
const axiosGetConfig = require('../config/axiosGetConfig');

async function SubProductCollecting(params) {

    // * acess from the other servers
    let axiosProductConfig = axiosGetConfig({ url: `/products/?style=${params.productID}` });
    let res = await axios(axiosProductConfig);
    let fetchSubProductData = res['data'];

    let subPrododuct = [];

    for (let value of fetchSubProductData.values()) {

        subPrododuct.push({
            subProductID : value['sku'],
            colorName : value['colorName'],
            colorHexCode : value['colorHexCode'],
            frontImage : value['colorFrontImage'],
            backImage: value['colorBackImage'],
            sideImage: value['colorSideImage'],
            sizeName: value['sizeName'],
            sizeCode: value['sizeCode'],
        });
    }

    return subPrododuct;
}

module.exports = SubProductCollecting;