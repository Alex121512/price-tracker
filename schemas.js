const Joi = require('joi');

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