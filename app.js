require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');

const Product = require('./models/product');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('index', { products });
})



app.listen(3000, () => {
    console.log('Listening on the port 3000');
})