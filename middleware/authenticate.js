function isAuthenticated(req, res, next) {
    console.log("Checking authentication status...");
    console.log("Session User:", req.session.user); // Log session user
    if (req.isAuthenticated() && req.session.user) {
        console.log("User is authenticated");
        return next();
    } else {
        console.log("User is not authenticated");
        res.status(401).send('You have no access');
    }
}

module.exports = { isAuthenticated };