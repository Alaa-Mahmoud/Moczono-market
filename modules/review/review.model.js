const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Review', ReviewSchema);