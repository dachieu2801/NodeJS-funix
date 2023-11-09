const Product = require('../models/Product');

exports.addProductToCart = async (req, res) => {
    const { id } = req.body;
    try {
        if (id) {
            const cart = await req.user.getCart();
            const products = await cart.getProducts({ where: { id: id } });
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            let newQuantity = 1;
            if (product) {
                newQuantity = product.cartItem.quantity + 1;
                return cart.addProduct(product, {
                    through: { quantity: newQuantity }
                }).then(() => {
                    return res.status(200).send({
                        message: 'Successfully'
                    })
                }).catch((error) => {
                    return res.status(400).send(JSON.stringify({
                        message: error.message
                    }))
                })
            }
            product = await Product.findByPk(id);
            if (product) {
                return cart.addProduct(product, {
                    through: { quantity: newQuantity }
                }).then(() => {
                    return res.status(200).send({
                        message: 'Successfully'
                    })
                }).catch((error) => {
                    return res.status(400).send(JSON.stringify({
                        message: error.message
                    }))
                })
            }
            return res.status(404).send(JSON.stringify({
                message: 'Not found product !'
            }))
        }
        return res.status(400).send(JSON.stringify({
            message: 'Not found param id !'
        }))
    } catch (error) {
        return res.status(500).send(JSON.stringify({
            message: error.message,
        }))
    }
}

exports.getProductInCart = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const cart = await user.getCart();
            if (cart) {
                const products = await cart.getProducts();
                if (products.length > 0) {
                    return res.send(JSON.stringify(products))
                }
                return res.send(JSON.stringify([]))
            }
            return res.status(404).send(JSON.stringify({
                message: 'Cart not found !'
            }))
        }
        return res.status(401).send(JSON.stringify({
            message: "Unauthorize."
        }))
    } catch (error) {
        return res.status(500).send(JSON.stringify({
            message: error.message
        }))
    }
}

exports.deleteProductInCart = async (req, res) => {
    const { proId } = req.params;
    try {
        if (proId) {
            const user = req.user;
            if (user) {
                const cart = await user.getCart();
                if (cart) {
                    const products = await cart.getProducts({ where: { id: parseInt(proId) } });
                    let product;
                    if (products.length > 0) {
                        product = products[0];
                        const deleteProduct = await product.cartItem.destroy();
                        return res.send(JSON.stringify(deleteProduct))
                    }
                    return res.status(404).send(JSON.stringify({
                        message: 'Product not found !'
                    }))
                }
                return res.status(404).send(JSON.stringify({
                    message: 'Cart not found !'
                }))
            }
            return res.status(401).send(JSON.stringify({
                message: "Unauthorize."
            }))
        }

    } catch (error) {
        return res.status(500).send(JSON.stringify({
            message: error.message
        }))
    }
}