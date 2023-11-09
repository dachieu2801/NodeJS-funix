const products = [];

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = Math.random()
    }

    save() {
        products.push(this);
    }

    static edit(title, imageUrl, description, price, id) {
        let IEditProd = products.findIndex(product => product.id === id);
        console.log(IEditProd);
        products.splice(IEditProd, 1, { title, imageUrl, description, price, id })
    }

    static fetchAll() {
        return products;
    }
}

exports.products = products