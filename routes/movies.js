const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
const validateMovie = require('../middleware/validate-movies');
const movieController = require('../controllers/movies');

const router = express.Router();

router.get('/', movieController.getAll);
router.get('/:id', movieController.getSingle);
router.post('/', isAuthenticated, validateMovie.createMovalidateMovie, movieController.createMovalidateMovie);
router.put('/:id', isAuthenticated, validateMovie.updateMovalidateMovie, movieController.updateMovalidateMovie);
router.delete('/:id', isAuthenticated, movieController.deleteMovalidateMovie);

module.exports = router;