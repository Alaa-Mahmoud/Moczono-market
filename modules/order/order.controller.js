const stripe = require('stripe')('sk_test_Q3QL5Dq2L19z1hkFAJ3H7s68');
const Order = require('./order.model');

exports.payment = async(req, res) => {
    const stripeToken = req.body.stripeToken;
    const currentCharges = Math.round(req.body.totalPrice * 100);
    stripe.customers({ source: stripeToken.id }).then((customer) => {
        return stripe.chargers.create({
            amount: currentCharges,
            currency: 'usd',
            customer: customer.id
        });
    }).then((charge) => {
        const products = req.body.products;
        let order = new Order();
        order.owner = req.decoded.user._id;
        order.totalPrice = currentCharges;

        products.map((product) => {
            order.product.push({
                product: product.product,
                quantity: product.quantaty
            });
        });
        order.save();
        res.status(201).json({ success: true, message: "successfuly made a payment" });
    });
};