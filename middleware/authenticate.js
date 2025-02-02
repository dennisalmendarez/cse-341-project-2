function isAuthenticated(req, res, next) {
    console.log("Checking authentication status...");
    if (req.isAuthenticated && req.isAuthenticated()) {
        console.log("User is authenticated");
        return next();
    } else {
        console.log("User is not authenticated");
        res.status(401).send('You have no access');
    }
}

module.exports = { isAuthenticated };