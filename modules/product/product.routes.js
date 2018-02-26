const router = require('express').Router();
const multer = require('multer');
const checkAuth = require('../../services/check-jwt');
const ProductController = require('./product.controller');
const Product = require('./product.model');
const faker = require('faker');



/** multer preperation functions */
const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, '../uploads/');
    },
    filename: (req, file, done) => {
        done(null, file.originalname);
    }
});

const fileFilter = (req, file, done) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        done(null, true);
    } else {
        done(null, false);
    }
};

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 * 6 },
    fileFilter,
});

router.route('/products')
    .get(checkAuth, ProductController.getProducts)
    .post([upload.single('image'), checkAuth], ProductController.createProduct);

router.get('/categories/:id', checkAuth, ProductController.getProductsByCategory);
router.get('/product/:id', checkAuth, ProductController.findProductById);

// search for product 

router.get('/search', ProductController.searchForProduct);





/* just for testing  */

router.get("/faker/test", (req, res) => {
    for (i = 0; i < 20; i++) {
        let product = new Product();
        product.category = "5a905232437a6b1970417b73";
        product.owner = "5a835bed0a66b827f049611d";
        product.title = faker.commerce.productName();
        product.description = faker.lorem.word();
        product.image = faker.image.cats();
        product.price = faker.commerce.price();
        product.save();
    }
    res.json({ message: "20 products added" });
});


module.exports = router;