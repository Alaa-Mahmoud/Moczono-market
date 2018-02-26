// here where u can register api routes

const userRoutes = require('../modules/user/user.routes');
const categoryRoutes = require('../modules/category/category.routes');
const productRoutes = require('../modules/product/product.routes');
const reviewRoutes = require('./review/review.routes');
const orderRoutes = require('../modules/order/order.routes');

module.exports = (app) => {
    app.use('/api/account', userRoutes);
    app.use('/api', [categoryRoutes, productRoutes, reviewRoutes, orderRoutes]);
};