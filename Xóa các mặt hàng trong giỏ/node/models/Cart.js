let cart = {
  products: [],
  totalPrice: 0
};
let products = cart.products

module.exports = class Cart {

  static addCart(id, productPrice, title) {
    if (products.length === 0) {
      products.push({ id, productPrice, title, qty: 1 })
    } else {
      const iNewProd = products.findIndex(product => product.id === id);
      if (iNewProd !== -1) {
        products[iNewProd].qty += 1
      } else {
        products.push({ id, productPrice, title, qty: 1 })
      }
    }
  }

  static deleteCart(id) {
    const idDelProd = products.findIndex(product => product.id === id);
    products.splice(idDelProd, 1)
  }

  static fetchAll() {
    cart.totalPrice = 0
    products.forEach(product => {
      cart.totalPrice += (Number(product.productPrice) * Number(product.qty))
    })
    return cart;
  }
};