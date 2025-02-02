const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
const validateAnime = require('../middleware/validate-anime');
const animeController = require('../controllers/animes');

const router = express.Router();

router.get('/', animeController.getAll);
router.get('/:id', animeController.getSingle);
router.post('/', isAuthenticated, validateAnime.createAnime, animeController.createAnime);
router.put('/:id', isAuthenticated, validateAnime.updateAnime, animeController.updateAnime);
router.delete('/:id', isAuthenticated, animeController.deleteAnime);

module.exports = router;