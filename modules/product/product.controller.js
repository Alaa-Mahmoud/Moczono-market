const Product = require('./product.model');

/* setup algolia search  */
const algoliasearch = require('algoliasearch');
const client = algoliasearch('1AH0VVFPUJ', '8d1b860ac549c9735e8e8c48935ac035');
const index = client.initIndex('amazonov1');

exports.createProduct = async(req, res) => {
    try {
        let product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path,
            category: req.body.category,
            owner: req.decoded.user._id,
        });
        res.status(201).json({ success: true, message: 'Product added successfully', product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find({ owner: req.decoded.user._id })
            .populate('owner').populate('category');

        if (products.length > 0) {
            res.status(200).json({ success: true, message: "Products", products });
        } else {
            res.status(400).json({ success: false, message: "No Product Found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProductsByCategory = async(req, res) => {
    try {
        const perPage = 10;
        const page = req.query.page;
        const productsPromise = Product.find({ category: req.params.id })
            .skip(perPage * page).limit(perPage).populate('category').populate('owner').populate('reviews');
        const totalProductsPromise = Product.count({ category: req.params.id });
        const [products, totalProducts] = await Promise.all([productsPromise, totalProductsPromise]);
        if (products.length > 0 && totalProducts > 0) {
            res.status(200).json({
                success: true,
                message: 'category',
                products,
                categoryName: products[0].category.name,
                totalProducts,
                pages: Math.ceil(totalProducts / perPage)
            });
        } else {
            return res.status(400).json({ success: false, message: "No Products found for this category " });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};


exports.findProductById = async(req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
            .populate('owner').populate('category').deepPopulate('reviews.owner');
        if (!product) {
            return res.status(400).json({ success: false, message: 'no product found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

exports.searchForProduct = async(req, res) => {
    try {
        if (req.query.query) {
            const product = await index.search({ query: req.query.query, page: req.query.page });
            res.status(200).json({
                success: true,
                content: product,
                search_result: req.query.query,
                message: 'here is what u r searching for'
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}