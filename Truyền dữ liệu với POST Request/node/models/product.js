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

    static fetchAll() {
        return products;
    }
}