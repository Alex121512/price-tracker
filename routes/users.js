const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { validateUser, isLoggedIn, requireRole } = require('../middleware');

router.get('/login', users.renderLogin);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.get('/users/new', isLoggedIn, requireRole('admin'), users.renderNewUser);

router.post('/users/new', isLoggedIn, requireRole('admin'), validateUser, users.createUser);

module.exports = router;