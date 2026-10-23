require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

async function createAdmin() {
    await mongoose.connect(process.env.DB_URL);

    const existing = await User.findOne({ username: process.env.ADMIN_USERNAME });
    if (existing) {
        await User.deleteOne(existing);
    }

    const admin = new User({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
    });
    await User.register(admin, process.env.ADMIN_PASSWORD);
    console.log('Admin created.');

    await mongoose.connection.close();
}

createAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});