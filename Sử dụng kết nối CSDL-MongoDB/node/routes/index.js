const adminRoutes = require('./admin');
const shopRoutes = require('./shop');
const cartRoutes = require('./cart');
const ordersRoutes = require('./orders');


function route(app) {
  app.use('/orders', ordersRoutes)
  app.use('/admin', adminRoutes);
  app.use('/cart', cartRoutes);
  app.use('/', shopRoutes);

}

module.exports = route;
