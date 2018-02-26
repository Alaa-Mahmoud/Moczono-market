const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const OrderSchema = Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: { type: Number, default: 0 },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        Quantity: { type: Number, default: 1 }
    }]

});

ProductSchema.plugin(deepPopulate);


module.exports = mongoose.model('Order', OrderSchema);