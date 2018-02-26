const jwt = require('jsonwebtoken');
const config = require('../config/api.env');

module.exports = function(req, res, next) {
    let token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: 'faild to authonticate user' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(400).json({ success: false, message: 'No token Provided' });

    }
};