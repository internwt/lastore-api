const Product = require('../../model/product')
// get product list
const getProductList = async (req, res, next) => {
    const getData = await Product.find()
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


const addProduct = async (req, res, next) => {
    const { name, image, quantity, description, status, rating, price } = req.body;
    const newProduct = new Product({ name, image, quantity, description, status, rating, price })
    const addProduct = await newProduct.save()
    if (addProduct) {
        res.status(201).json({ isError: true, product: newProduct, message: 'product created successfully' })
    } else {
        res.status(404).json({ isError: true, message: 'Something went wrong' })
    }

}
module.exports = {
    getProductList,
    getProductDetailById,
    addProduct
}