const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const animesController = require('../controllers/animes');
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
    '/', validateAnime.createAnime, validateRequest, animesController.createAnime
);

router.put(
    '/:id', validateAnime.updateAnime, validateRequest, animesController.updateAnime
);

router.delete('/:id', animesController.deleteAnime);

module.exports = router;