import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongodb from './data/database.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GithubStrategy } from 'passport-github';
import cors from 'cors';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL })
}));

app.use(passport.initialize());

app.use(passport.session());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}));
app.use(cors({origin: '*'}));
app.use('/' , require('./routes'));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/github/callback', passport.authenticate('github',
    { failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

app.get('/session-test', (req, res) => {
    console.log("Session Data:", req.session); // Log session to the console
    res.json(req.session);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});