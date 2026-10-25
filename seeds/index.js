const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const { names, descriptors, categories } = require('./seedHelpers');

const dbUrl = 'mongodb://localhost:27017/price-tracker';

mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const seedDB = async () => {
    await Product.deleteMany({});
    const admin = await User.findOne({ role: 'admin' });
    for (let i = 0; i < 20; i++) {
        const random15 = Math.floor(Math.random() * 15);
        const randomCategory = Math.floor(Math.random() * categories.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const product = new Product({
            name: names[random15],
            code: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            category: categories[randomCategory],
            description: descriptors[random15],
            prices: {
                tier1: price,
                tier2: price + 2,
                tier3: price + 4,
                tier4: price + 6,
                tier5: price + 8,
            },
            lastUpdatedBy: admin?._id,
        })
        await product.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})