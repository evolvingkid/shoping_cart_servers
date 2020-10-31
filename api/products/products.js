const express = require('express');
const router = express.Router();
const config = require('config');

const serverAuthToken = config.get('server-auth-token');
const Products = require('../../models/product');

router.get('/', async (req, res) => {
    const token = req.header('server-auth-token');

    if (token == undefined) {
        return res.status(401).json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    if (token != serverAuthToken) {
        return res.status(401).json({
            errors: 'You dont have permission to acess this servers'
        });
    }

    try {

        let { limit, random, page, baseCategory, categories, latest, size, color } = req.query;

        let fetchData;

        let CustomproductModel = Products.find();

        let dbQuery = {};
        // * base category
        if (baseCategory !== undefined) {
            dbQuery['baseCategory'] = baseCategory;
        }
        // * category
        if (categories !== undefined) {
            dbQuery['categories'] = categories;
        }
        // * to get latest products
        if (latest != undefined) {
            dbQuery['newStyle'] = latest;
        }
        // * to get querry of all the sub products
        if (size != undefined) {
            dbQuery['subProducts.sizeCode'] = size;
        }
        // * to get size from sub products
        if (size != undefined) {
            dbQuery['subProducts.sizeCode'] = size;
        }
        //* to get color from sub products
        if (color != undefined) {
            dbQuery['subProducts.colorName'] = color;
        }

        //* to parse the above query
        if (dbQuery !== undefined && dbQuery !== null) {
            CustomproductModel = Products.find(dbQuery);
        }

        // * category showing with limit
        if (limit !== undefined) {
            limit = parseInt(limit);
            fetchData = await CustomproductModel.limit(limit);
            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * product showing with limit
        if (limit !== undefined) {
            limit = parseInt(limit);
            fetchData = await CustomproductModel.limit(limit);
            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * product showing with random
        if (random !== undefined) {
            random = parseInt(random);
            fetchData = await Products.aggregate([{ $sample: { size: random } }]);
            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * pagenation
        if (page !== undefined) {
            page = parseInt(page);
            if (page === 1) {
                fetchData = await CustomproductModel.limit(10);
                return res.json(fetchData);
            }
            let skip = (page - 1) * 10;

            fetchData = await CustomproductModel.skip(skip).limit(10);

            if (fetchData.length === null || fetchData.length === 0) {
                return res.status(413).json({ errors: 'unbounded page number' });
            }

            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * base category showing
        fetchData = await CustomproductModel;

        return res.json({
            sucess: true,
            data: fetchData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: 'Server error Occured'
        });
    }
});

module.exports = router;