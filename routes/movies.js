const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const moviesController = require('../controllers/movies');

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
    '/',
    [
        body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
        body('description').isString().optional(),
        body('releaseDate').isString().notEmpty().withMessage('Release Date is required'),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
    validateRequest,
    moviesController.createMovie
);

router.put(
    '/:id',
    [
        body('title').isString().optional(),
        body('description').isString().optional(),
        body('releaseDate').isString().optional(),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
    validateRequest,
    moviesController.updateMovie
);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;