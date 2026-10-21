const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const products = require('../controllers/products');

router.get('/', products.index);

router.get('/new', products.renderNewForm);

router.post('/', products.createProduct);

router.get('/:id', products.showProduct);

router.get('/:id/edit', products.renderEditForm);

router.put('/:id', products.updateProduct);

router.delete('/:id', products.deleteProduct);

module.exports = router;