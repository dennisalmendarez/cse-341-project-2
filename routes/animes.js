const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const animesController = require('../controllers/animes');
const { isAuthenticated } = require('../middleware/authenticate');
const validateAnime = require('../middleware/validate-anime');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', animesController.getAll);

router.get('/:id', animesController.getSingle);

router.post(
    '/', validateAnime, isAuthenticated, validateRequest, animesController.createAnime
);

router.put(
    '/:id', validateAnime, isAuthenticated, validateRequest, animesController.updateAnime
);

router.delete('/:id', isAuthenticated, animesController.deleteAnime);

module.exports = router;