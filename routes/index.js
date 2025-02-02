const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/animes', require('./animes'));
router.use('/api-docs', require('../swagger'));

router.get('/login', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    req.session.user = req.user;
    req.session.save(() => {
        res.redirect('/'); // Redirect after login
    });
});

router.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
});

// Debugging route to check session
router.get('/session', (req, res) => res.json(req.session));

module.exports = router;