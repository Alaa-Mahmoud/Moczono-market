const router = require('express').Router();
const checkJWT = require('../../services/check-jwt');
const OrdersController = require('./order.controller');

router.post('/payment', checkJWT, OrdersController.payment);


module.exports = router;