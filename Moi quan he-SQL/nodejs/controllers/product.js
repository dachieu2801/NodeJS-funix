const Product = require('../models/Product')

exports.getAllProduct = async (req, res) => {
    console.log(await req.user);
    const products = await req.user.getProducts();
    res.send(JSON.stringify({ products }));
}

exports.createProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    try {
        if (title && imageUrl && price >= 0) {
            return req.user.createProduct({
                title: title,
                imageUrl: imageUrl,
                price: parseFloat(price),
                description: description,
            }).then((product) => {
                return res.send(JSON.stringify(product))
            })
        }
        return res.status(404).send(JSON.stringify({
            message: "Some params is null",
        }))
    } catch (error) {
        return res.send(JSON.stringify({
            message: error.message
        }))
    }
}

exports.getProductById = (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    console.log(id)
    try {
        if (id) {
            return req.user.getProducts({ where: { id: parseInt(id) } }).then((products) => {
                if (products.length > 0) {
                    return res.send(JSON.stringify(products[0]))
                }
                return res.status(404).send(JSON.stringify({
                    message: "Not found product"
                }))
            }).catch(error => {
                return res.status(400).send(JSON.stringify({
                    message: error.message
                }))
            })
        }
        return res.status(400).send(JSON.stringify({
            message: "Not found id params"
        }))
    } catch (error) {
        return res.status(400).send(JSON.stringify({
            message: error.message
        }))
    }
}

exports.updateProductById = async (req, res) => {
    const { id, title, imageUrl, price, description } = req.body;
    try {
        if (id) {
            let product = await Product.findByPk(parseInt(id))
            if (product) {
                product.title = title;
                product.imageUrl = imageUrl;
                product.price = price;
                product.description = description;
                const productUpdate = await product.save()
                if (productUpdate) {
                    return res.send(JSON.stringify(productUpdate))
                }
            }
            return res.status(404).send(JSON.stringify({
                message: "Not found product"
            }))
        }
        return res.status(400).send(JSON.stringify({
            message: "Not found id params"
        }))
    } catch (error) {
        return res.status(400).send(JSON.stringify({
            message: error.message
        }))
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const product = await Product.findByPk(parseInt(id));
            if (product) {
                const deleteProduct = await product.destroy();
                return res.send(JSON.stringify(deleteProduct))
            }
            return res.status(404).send(JSON.stringify({
                message: "Not found product!"
            }))
        }
        return res.status(400).send(JSON.stringify({
            message: "Not found id param!"
        }))
    } catch (error) {
        return res.status(500).send(JSON.stringify({
            message: error.message
        }))
    }
}