const express = require('express');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');

require('dotenv').config();

const mongodb = require('./data/database');

const passport = require('passport');

const session = require('express-session');

const GithubStrategy = require('passport-github2').Strategy;

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
},
function(accessToken, refreshToken, profile, done) {
    console.log("GitHub Profile:", profile);  // Debugging log
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    console.log("🔹 Serializing User:", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("🔹 Deserializing User:", user);
    done(null, user);
});

app.get('/', (req, res) => { 
    if (req.session.user && req.session.user.displayName) {
        res.send(`Logged in as ${req.session.user.displayName}`);
    } else {
        res.send('Logged out');
    }
});

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs' }), (req, res) => {
    console.log("✅ GitHub Authentication Callback Reached");
    
    if (req.user) {
        console.log("Authenticated User:", req.user);
        req.session.user = req.user;
        console.log("Session After Login:", req.session);
        res.redirect('/');
    } else {
        console.log("❌ Authentication Failed");
        res.send('Authentication failed');
    }
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});