const { body } = require('express-validator');

const validateMovie = {
    createMovie: [
            body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
            body('description').isString().optional(),
            body('releaseDate').isString().notEmpty().withMessage('Release Date is required'),
            body('genres').isArray().optional().withMessage('Genres must be an array'),
            body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
            body('source').isString().optional(),
            body('studio').isString().optional(),
        ],

    updateMovie: [
        body('title').isString().optional(),
        body('description').isString().optional(),
        body('releaseDate').isString().optional(),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
};

module.exports = validateMovie;