const { body } = require('express-validator');

const validateAnime = {
    createAnime: [
        body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
        body('description').isString().optional(),
        body('startDate').isString().optional(),
        body('endDate').isString().optional(),
        body('status').isIn(['Ongoing', 'Completed', 'Hiatus']).withMessage('Invalid status value'),
        body('episodes').isInt({ min: 1 }).optional().withMessage('Episodes must be a positive integer'),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('genres.*').isString().optional().withMessage('Each genre must be a string'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],

    updateAnime: [
        body('title').isString().optional(),
        body('description').isString().optional(),
        body('startDate').isString().optional(),
        body('endDate').isString().optional(),
        body('status').isIn(['Ongoing', 'Completed', 'Hiatus']).optional().withMessage('Invalid status value'),
        body('episodes').isInt({ min: 1 }).optional().withMessage('Episodes must be a positive integer'),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('genres.*').isString().optional().withMessage('Each genre must be a string'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
};

module.exports = validateAnime;