const User = require('./user.model');
const Order = require('../order/order.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/api.env');

exports.signup = async(req, res) => {
    try {
        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = req.body.password;
        user.picture = user.gravatar();
        user.isSeller = req.body.isSeller;
        await user.save();
        let token = jwt.sign({ user: user }, config.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ success: true, token: token });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

};


exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        let validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
            res.json({ success: false, message: 'Authontication faild ' });
        }
        let token = jwt.sign({ user: user }, config.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ success: true, token });

    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};

exports.getProfile = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.decoded.user._id });
        if (!user) {
            res.status(400).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, user, message: 'Successful' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};

exports.editProfile = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.decoded.user._id });

        if (!user) {
            return res.status(400).json({ success: false, message: "profile not found" });
        }
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;
        if (req.body.password) user.password = req.body.password;
        user.isSeller = req.body.isSeller;
        user.save();
        res.status(200).json({ success: true, message: "Profile edited successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, error });

    }
};


exports.getAddress = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.decoded.user._id });

        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        res.status(200).json({ success: true, address: user.address, message: "successful" });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};

exports.editAddress = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.decoded.user._id });
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        if (req.body.add1) user.address.add1 = req.body.add1;
        if (req.body.add2) user.address.add2 = req.body.add2;
        if (req.body.city) user.address.city = req.body.city;
        if (req.body.state) user.address.state = req.body.state;
        if (req.body.country) user.address.country = req.body.country;
        if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
        user.save();
        res.status(200).json({ success: true, message: "address edited successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};

exports.getUserOrders = async(req, res) => {
    try {
        const orders = await Order.find({ owner: req.decoded.user._id })
            .populate('products.product').populate('owner');

        if (orders.length < 0) {
            return res.status(400).json({ success: false, message: "No Orders Founded" });
        }
        res.status(200).json({ success: true, message: 'orderd founded', orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }

};

exports.getUserSingleOrder = async(req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id })
            .deepPopulate('products.product.owner');
        if (!order) {
            return res.ststus(400).json({ success: false, message: 'no order found' });
        }

        res.ststus(200).json({ success: true, message: "orderd found", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}