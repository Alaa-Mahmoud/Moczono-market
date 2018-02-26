const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');


const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ProductSchema.virtual('averageRating').get(function() {
    var rating = 0;
    if (this.reviews.length == 0) {
        rating = 0;
    } else {
        this.reviews.map((review) => {
            rating += review.rating;
        });

        rating = rating / this.reviews.length;
    }
    return rating;
});

ProductSchema.plugin(uniqueValidator, {
    message: '{VALUE} is already taken'
});
ProductSchema.plugin(deepPopulate);
ProductSchema.plugin(mongooseAlgolia, {
    appId: '1AH0VVFPUJ',
    apiKey: '8d1b860ac549c9735e8e8c48935ac035',
    indexName: 'amazonov1',
    selector: '_id image title description reviews price category owner createdAt avarageRating',
    populate: {
        path: 'owner reviews',
        select: 'name rating'
    },
    defaults: {
        author: 'unKnown'
    },
    mappings: {
        title: function(value) {
            return `${value}`;
        }
    },
    virtuals: {
        avarageRating: function(doc) {
            var rating = 0;
            if (doc.reviews.length == 0) {
                rating = 0;
            } else {
                doc.reviews.map((review) => {
                    rating += review.rating;
                });

                rating = rating / doc.reviews.length;
            }
            return rating;
        }
    },
    debug: true
});
let Model = mongoose.model('Product', ProductSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
    searchableAttributes: ['title'],
});

module.exports = Model;