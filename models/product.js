const mongoose = require('mongoose');
const { CATEGORIES } = require('../utils/categories');

const { Schema } = mongoose;

const priceField = { type: Number, required: true, min: 0 };

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    description: { type: String, trim: true },
    prices: {
        tier1: priceField,
        tier2: priceField,
        tier3: priceField,
        tier4: priceField,
        tier5: priceField,
    },
    //lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);