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

async function isLastAdmin(user) {
    if (user.role !== 'admin') return false;
    const count = await User.countDocuments({ role: 'admin' });
    return count <= 1;
}

module.exports.index = async (req, res) => {
    const users = await User.find({}).sort({ role: 1, username: 1 });
    res.render('users/index', { users, ROLES });
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

module.exports.updateRole = async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }
    if (!ROLES.includes(role)) {
        req.flash('error', 'Invalid role.');
        return res.redirect('/users');
    }
    if (user._id.equals(req.user._id)) {
        req.flash('error', "You can't change your own role.");
        return res.redirect('/users');
    }
    if (role !== 'admin' && await isLastAdmin(user)) {
        req.flash('error', 'There must be at least one admin.');
        return res.redirect('/users');
    }

    user.role = role;
    await user.save();
    req.flash('success', `${user.username} is now ${role}.`);
    res.redirect('/users');
};

module.exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        req.flash('error', 'User not found.');
        return res.redirect('/users');
    }
    if (user._id.equals(req.user._id)) {
        req.flash('error', "You can't delete your own account.");
        return res.redirect('/users');
    }
    if (await isLastAdmin(user)) {
        req.flash('error', 'There must be at least one admin.');
        return res.redirect('/users');
    }

    await User.findByIdAndDelete(user._id);
    req.flash('success', `${user.username} has been deleted.`);
    res.redirect('/users');
};

module.exports.renderProfile = (req, res) => {
    res.render('users/profile');
};

module.exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
        req.flash('error', 'New password must be different from the current one.');
        return res.redirect('/profile');
    }

    try {
        const user = await User.findById(req.user._id).select('+hash +salt');
        await user.changePassword(currentPassword, newPassword);
        req.flash('success', 'Your password has been changed.');
        res.redirect('/profile');
    } catch (e) {
        if (e.name === 'IncorrectPasswordError') {
            req.flash('error', 'Current password is incorrect.');
        } else {
            req.flash('error', e.message);
        }
        res.redirect('/profile');
    }
};