const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

CategorySchema = new Schema({
    name: { type: String, unique: true, lowercase: true, required: [true, 'Name is required'] },
    createdAt: { type: Date, default: Date.now() }
});

CategorySchema.plugin(uniqueValidator, {
    message: '{VALUE} is already taken'
});

module.exports = mongoose.model('Category', CategorySchema);