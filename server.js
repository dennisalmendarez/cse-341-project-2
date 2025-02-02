const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongodb = require('./data/database');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require('./config/passport'); // Loads GitHub authentication config

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (Allows API requests from Swagger)
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Session Configuration (Ensures user remains logged in)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    }
});