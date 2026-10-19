const mongoose = require('mongoose');

const { Schema } = mongoose;

const CATEGORIES = [
    // Seafood
    'Fish – Fresh', 'Fish – Frozen', 'Shellfish', 'Crustaceans', 'Cephalopods',
    'Smoked Seafood', 'Canned Seafood', 'Roe & Caviar', 'Surimi & Processed Seafood', 'Seaweed',
    // Meat
    'Beef', 'Pork', 'Lamb & Goat', 'Veal', 'Poultry', 'Game', 'Offal', 'Ground Meat',
    'Sausages', 'Deli & Cured Meats', 'Marinated & Ready-to-Cook', 'Plant-Based Alternatives',
    // Dry foods
    'Rice & Grains', 'Pasta & Noodles', 'Flour & Baking', 'Beans & Legumes', 'Nuts & Seeds',
    'Spices & Seasonings', 'Sauces & Condiments', 'Oils & Vinegars', 'Canned Goods',
    'Breading & Batter Mixes',
    // Other
    'Frozen Prepared Foods', 'Packaging & Supplies', 'Other',
];

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