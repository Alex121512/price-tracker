const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middleware');
const products = require('../controllers/products');

router.get('/', products.index);

router.get('/new', products.renderNewForm);

router.post('/', validateProduct, products.createProduct);

router.get('/:id', products.showProduct);

router.get('/:id/edit', products.renderEditForm);

router.put('/:id', validateProduct, products.updateProduct);

router.delete('/:id', products.deleteProduct);

module.exports = router;