// Import model Product
const models = require("../models/")

// Get semua product
module.exports.getProducts = async (req, res) => {
    try {
        const product = await models.Product.findAll();
        res.send(product);
    } catch (err) {
        console.log(err);
    }
}

// Get product berdasarkan id
module.exports.getProductById = async (req, res) => {
    try {
        const product = await models.Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

// Create product baru
module.exports.createProduct = async (req, res) => {
    try {
        await models.Product.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// Update product berdasarkan id
module.exports.updateProduct = async (req, res) => {
    try {
        await models.Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete product berdasarkan id
module.exports.deleteProduct = async (req, res) => {
    try {
        await models.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}