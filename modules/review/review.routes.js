const router = require('express').Router();
const checkJWT = require('../../services/check-jwt');
const ReviewController = require('./review.controller');


router.post('/review', checkJWT, ReviewController.createReview);


module.exports = router