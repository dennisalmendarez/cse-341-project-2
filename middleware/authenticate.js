const { validationResult } = require('express-validator');

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ message: 'You do not have access.' });
    }
    next();
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { isAuthenticated, validateRequest };