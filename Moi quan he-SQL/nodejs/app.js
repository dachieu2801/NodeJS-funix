const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/sequelize');

const productApi = require('./routes/product')
const cartApi = require('./routes/cart')
const orderApi = require('./routes/order')

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const CartItem = require('./models/CartItem')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        if (user) {
            user.getCart().then((cartUser) => {
                if (cartUser) {
                    return cartUser;
                }
                return user.createCart().then((cart) => {
                    return cart
                })
            }).catch((error) => {
                console.log(error)
            })
        }
        return user;
    }).then((user) => {
        req.user = user
        console.log(req.user);
        next();
    })
})

app.use('/api', productApi);
app.use('/api', cartApi);
app.use('/api', orderApi);

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("sdsad")
    console.log(error)
})