const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { validateUser, validatePassword, storeReturnTo, isLoggedIn, requireRole } = require('../middleware');

router.get('/', (req, res) => {
    res.redirect(req.isAuthenticated() ? '/products' : '/login');
});

router.get('/login', users.renderLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.get('/profile', isLoggedIn, users.renderProfile);

router.patch('/profile/password', isLoggedIn, validatePassword, users.changePassword);

router.get('/users', isLoggedIn, requireRole('admin'), users.index);

router.get('/users/new', isLoggedIn, requireRole('admin'), users.renderNewUser);

router.post('/users/new', isLoggedIn, requireRole('admin'), validateUser, users.createUser);

router.patch('/users/:id/role', isLoggedIn, requireRole('admin'), users.updateRole);

router.delete('/users/:id', isLoggedIn, requireRole('admin'), users.deleteUser);



module.exports = router;