const Review = require('./review.model');
const Product = require('../product/product.model');

exports.createReview = async(req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.productId });

        if (!product) {
            return res.status(400).json({ success: false, message: 'No Product Found' });
        }

        const review = await Review.create({
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            owner: req.decoded.user._id
        });

        product.reviews.push(review._id);

        await product.save()
        res.status(201).json({ success: true, message: 'Review added', product, review });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }

}