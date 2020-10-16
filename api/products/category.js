const express = require('express');
const router = express.Router();
const config = require('config');

const serverAuthToken = config.get('server-auth-token');
const Category = require('../../models/category')

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

        let { limit, random, page } = req.query;

        let fetchData;

        // * category showing with limit
        if (limit !== undefined) {
            limit = parseInt(limit);
            fetchData = await Category.find().limit(limit);
            return res.json({
                sucess: true,
                data: fetchData
            });

        }

        // * category showing with random
        if (random !== undefined) {
            random = parseInt(random);
            fetchData = await Category.aggregate([{ $sample: { size: random } }]);
            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * pagenation
        if (page !== undefined) {
            page = parseInt(page);
            if (page === 1) {
                fetchData = await Category.find().limit(10);
                return res.json(fetchData);
            }
            let skip = (page - 1) * 10;

            fetchData = await Category.find().skip(skip).limit(10);

            if (fetchData.length === null || fetchData.length === 0) {
                return res.status(413).json({ errors: 'unbounded page number' });
            }

            return res.json({
                sucess: true,
                data: fetchData
            });
        }

        // * base category showing
        fetchData = await Category.find();

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