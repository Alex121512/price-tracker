const Joi = require('joi');
const { ROLES } = require('./models/user');

const tier = Joi.number().min(0).required();

module.exports.productSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        category: Joi.string().trim().required(),
        description: Joi.string().allow(''),
        prices: Joi.object({
            tier1: tier,
            tier2: tier.min(Joi.ref('tier1')),
            tier3: tier.min(Joi.ref('tier2')),
            tier4: tier.min(Joi.ref('tier3')),
            tier5: tier.min(Joi.ref('tier4')),
        }).required(),
    }).required(),
});

module.exports.userSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    role: Joi.string().valid(...ROLES).required(),
    password: Joi.string().min(8).max(128).required(),
});

module.exports.passwordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
        .messages({ 'any.only': 'New passwords do not match' }),
});