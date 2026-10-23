const User = require('../models/user');
const { ROLES } = require('../models/user');

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged out.');
        res.redirect('/login');
    });
};

module.exports.renderNewUser = (req, res) => {
    res.render('users/new', { ROLES });
};

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const user = new User({ username, email, role });
        await User.register(user, password);
        req.flash('success', `User ${username} created as ${user.role}.`);
        res.redirect('/products');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/new');
    }
};