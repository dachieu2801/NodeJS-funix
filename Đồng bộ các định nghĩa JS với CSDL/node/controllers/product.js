const Product = require('../models/product')

exports.fetchAllProduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products) {
            return res.json(products)
        }
        return res.status(400).json({
            message: 'No product'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error server',
        })
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const product = await Product.findByPk(parseInt(id));
            if (product) {
                return res.json(product)
            }
            return res.status(404).json({
                message: 'Not found product',
            })
        }
        return res.status(400).send(JSON.stringify({
            message: 'Not found param id',
        }))
    } catch (error) {
        return res.status(500).send(JSON.stringify({
            message: 'Error server',
        }))
    }
}

exports.createProduct = async (req, res) => {
    const product = req.body;
    try {
        if (product) {
            const productCreate = await Product.create(product);
            return res.send(JSON.stringify(productCreate.dataValues))
        }
        return res.status(404).send(JSON.stringify({
            message: 'Something',
        }))
    } catch (error) {
        console.log(error);
        res.status(400).send(JSON.stringify({
            message: error.message,
        }))
    }
}

exports.updateProduct = async (req, res) => {
    const { id, title, description, price, imageUrl } = req.body
    try {
        const product = await Product.findByPk(parseInt(id));
        if (product) {
            product.title = title;
            product.description = description;
            product.price = price;
            product.imageUrl = imageUrl;
            const updateResult = await product.save()
            return res.send(JSON.stringify(updateResult))
        }
        return res.status(404).send(JSON.stringify({
            message: 'Something',
        }))
    } catch (error) {
        console.log(error)
        return res.status(500).send(JSON.stringify({
            message: 'Error server',
        }))
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const product = await Product.findByPk(parseInt(id));
            if (product) {
                const deleteResult = product.destroy();
                if (deleteResult) {
                    return res.send(JSON.stringify(deleteResult))
                }
                return res.status(404).send(JSON.stringify({
                    message: 'Not found product',
                }))
            }
        }
        return res.send(JSON.stringify({
            message: 'Not found id params',
        }))
    } catch (error) {
        console.log(error)
        return res.status(500).send(JSON.stringify({
            message: 'Error server',
        }))
    }
}