const router = require('express').Router();
const CategoryController = require('./category.controller');
const checkAuth = require('../../services/check-jwt');


router.route('/categories')
    .get(checkAuth, CategoryController.getAllCategories)
    .post(checkAuth, CategoryController.createCategory);


module.exports = router;