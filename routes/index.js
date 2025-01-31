const passport = require('passport');
const { route } = require('./swagger');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/movies', require('./movies'));

router.use('/animes', require('./animes'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.get('/session-test', (req, res) => {
    res.json(req.session);
});

module.exports = router;