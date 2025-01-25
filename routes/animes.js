const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const animesController = require('../controllers/animes');

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
    '/',
    [
        body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
        body('description').isString().optional(),
        body('startDate').isString().optional(),
        body('endDate').isString().optional(),
        body('status').isIn(['Ongoing', 'Completed', 'Hiatus']).withMessage('Invalid status value'),
        body('episodes').isInt({ min: 1 }).optional().withMessage('Episodes must be a positive integer'),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
    validateRequest,
    animesController.createAnime
);

router.put(
    '/:id',
    [
        body('title').isString().optional(),
        body('description').isString().optional(),
        body('startDate').isString().optional(),
        body('endDate').isString().optional(),
        body('status').isIn(['Ongoing', 'Completed', 'Hiatus']).optional().withMessage('Invalid status value'),
        body('episodes').isInt({ min: 1 }).optional().withMessage('Episodes must be a positive integer'),
        body('genres').isArray().optional().withMessage('Genres must be an array'),
        body('popularity').isFloat({ min: 0 }).optional().withMessage('Popularity must be a non-negative number'),
        body('source').isString().optional(),
        body('studio').isString().optional(),
    ],
    validateRequest,
    animesController.updateAnime
);

router.delete('/:id', animesController.deleteAnime);

module.exports = router;