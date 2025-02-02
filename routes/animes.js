const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const animesController = require('../controllers/animes');
const { isAuthenticated } = require('../middleware/authenticate');
const validateAnime = require('../middleware/validate-anime');

router.get('/', animesController.getAll);

router.get('/:id', animesController.getSingle);

router.post(
    '/', validateAnime.createAnime, isAuthenticated, validateRequest, animesController.createAnime
);

router.put(
    '/:id', validateAnime.updateAnime, isAuthenticated, validateRequest, animesController.updateAnime
);

router.delete('/:id', isAuthenticated, animesController.deleteAnime);

module.exports = router;