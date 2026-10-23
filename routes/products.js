const express = require('express');
const router = express.Router();
const { isLoggedIn, requireRole, validateProduct } = require('../middleware');
const products = require('../controllers/products');

router.use(isLoggedIn);

router.get('/', products.index);

router.get('/new', requireRole('manager', 'admin'), products.renderNewForm);

router.post('/', requireRole('manager', 'admin'), validateProduct, products.createProduct);

router.get('/:id', products.showProduct);

router.get('/:id/edit', requireRole('manager', 'admin'), products.renderEditForm);

router.put('/:id', requireRole('manager', 'admin'), validateProduct, products.updateProduct);

router.delete('/:id', requireRole('manager', 'admin'), products.deleteProduct);

module.exports = router;