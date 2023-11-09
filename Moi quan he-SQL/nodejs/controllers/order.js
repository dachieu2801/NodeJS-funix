exports.checkoutCart = async (req, res) => {
  try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts();
      const order = await req.user.createOrder();
      if (order) {
          products.map((product) => {
              order.addProduct(product, {
                  through: { quantity: product.cartItem.quantity }
              }).then((orderProduct) => {
                  if (orderProduct) {
                      product.cartItem.destroy();
                  }
              })
          })
          return res.status(200).send(JSON.stringify({
              message: "Successfully!"
          }))
      }
  } catch (error) {
      return res.status(500).send(JSON.stringify({
          message: error.message,
      }))
  }
}