const adminRoutes = require('./admin');
const shopRoutes = require('./shop');
const cartRoutes = require('./cart');
const editRoutes = require('./edit');


function route(app) {
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(cartRoutes);
  app.use(editRoutes);

}

module.exports = route;
