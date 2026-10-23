const { userSchema, productSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.method === 'GET') {
            req.session.returnTo = req.originalUrl;
        } else {
            // fallback for POST / DELETE / PUT
            req.session.returnTo = `/products/${req.params.id}`;
        }
        req.flash('error', 'You mush be singed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.requireRole = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        req.flash('error', "You don't have permission to do that.");
        return res.redirect('/products');
    }
    next();
};

module.exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}