const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/movies', require('./movies'));

router.use('/animes', require('./animes'));

module.exports = router;