const Product = require('../models/product');
const { CATEGORIES } = require('../utils/categories');
const escapeRegex = require('../utils/escapeRegex');

module.exports.index = async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const category = typeof req.query.category === 'string' ? req.query.category : '';

    const filter = {};

    if (q) {
        const regex = new RegExp(escapeRegex(q), 'i');
        filter.$or = [{ name: regex }, { code: regex }, { description: regex }];
    }

    if (CATEGORIES.includes(category)) {
        filter.category = category;
    }

    const products = await Product.find(filter).sort({ category: 1, name: 1 }).populate('lastUpdatedBy', 'username');;
    res.render('products/index', { products, q, category, CATEGORIES });
}

module.exports.renderNewForm = (req, res) => {
    res.render('products/new', { CATEGORIES });
}

module.exports.createProduct = async (req, res) => {
    const product = new Product(req.body.product);
    product.lastUpdatedBy = req.user._id;
    await product.save();
    req.flash('success', 'Successfully made a new product');
    res.redirect(`/products/${product._id}`);
}

module.exports.showProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('lastUpdatedBy', 'username');
    if (!product) {
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/products');
    }
    res.render('products/show', { product });
}

module.exports.renderEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/products');
    }
    res.render('products/edit', { product, CATEGORIES });
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product, lastUpdatedBy: req.user._id }, { runValidators: true, new: true });
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