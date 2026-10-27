function stripMongoOperators(value) {
    if (Array.isArray(value)) {
        value.forEach(stripMongoOperators);
    } else if (value && typeof value === 'object') {
        for (const key of Object.keys(value)) {
            if (key.startsWith('$') || key.includes('.')) {
                delete value[key];
            } else {
                stripMongoOperators(value[key]);
            }
        }
    }
    return value;
}

module.exports = (req, res, next) => {
    stripMongoOperators(req.body);
    next();
};