const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const moviesController = require('../controllers/movies');

const { isAuthenticated } = require('../middleware/authenticate');

const validateMovie = require('../middleware/validate-movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post(
    '/', validateMovie.createMovie, isAuthenticated, validateRequest, moviesController.createMovie
);

router.put(
    '/:id', validateMovie.createMovie, isAuthenticated, validateRequest, moviesController.updateMovie
);

router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;