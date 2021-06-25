const Product = require('../../model/product')

const getProductList = async (req, res, next) => {
    const getData = await Product.find()
    console.log(`getData`, getData)
    if (getData.length) {
        res.status(200).json({
            isFound: true,
            data: getData,
            message: 'List found Successfully'
        })
    } else {
        res.status(200).json({
            isFound: false,
            data: getData,
            message: 'No records found'
        })
    }
}

const getProductDetailById = async (req, res, next) => {
    const { product_id } = req.params
    const getData = await Product.findById(product_id)
    if (getData.length) {
        res.status(200).json({
            isFound: true,
            data: getData,
            message: 'List found Successfully'
        })
    } else {
        res.status(200).json({
            isFound: false,
            data: getData,
            message: 'No records found'
        })
    }
}

module.exports = {
    getProductList,
    getProductDetailById
}