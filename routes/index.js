const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/animes', require('./animes'));

module.exports = router;