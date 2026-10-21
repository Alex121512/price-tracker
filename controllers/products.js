const Product = require('../models/product');
const { CATEGORIES } = require('../public/categories');

module.exports.index = async (req, res) => {
    const products = await Product.find({});
    res.render('index', { products });
}

module.exports.renderNewForm = (req, res) => {
    res.render('new', { CATEGORIES });
}

module.exports.createProduct = async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    req.flash('success', 'Successfully made a new product');
    res.redirect(`/products/${product._id}`);
}

module.exports.showProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash('error', 'Cannot find that hike!');
        return res.redirect('/products');
    }
    res.render('show', { product });
}

module.exports.renderEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/products');
    }
    res.render('edit', { product, CATEGORIES });
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    await product.save();
    if (!product) {
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/products');
    }
    req.flash('success', 'Successfully updated product!');
    res.redirect(`/products/${product._id}`);
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted product!');
    res.redirect('/products');
}