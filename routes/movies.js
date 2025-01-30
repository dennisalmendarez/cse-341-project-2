const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const moviesController = require('../controllers/movies');

const validateMovie = require('../middleware/validate-movies');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post(
    '/', validateMovie.createMovie, validateRequest, moviesController.createMovie
);

router.put(
    '/:id', validateMovie.createMovie, validateRequest, moviesController.updateMovie
);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;