const router = require('express').Router();
const UserController = require('./user.controller');
const checkJWT = require('../../services/check-jwt');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.route('/profile')
    .get(checkJWT, UserController.getProfile)
    .post(checkJWT, UserController.editProfile);

router.route('/address')
    .get(checkJWT, UserController.getAddress)
    .post(checkJWT, UserController.editAddress);

router.get('/orders', checkJWT, UserController.getUserOrders);
router.get('/orders/:id', checkJWT, UserController.getUserSingleOrder);

module.exports = router;