const mongodb = require('../data/database');

async function isAuthenticated(req, res, next) {
    console.log("Checking authentication status...");
    console.log("Session User:", req.session.user);

    if (req.isAuthenticated() && req.session.user) {
        // Fetch user role from database
        const db = mongodb.getDatabase().db();
        const user = await db.collection('Users').findOne({ githubId: req.session.user.id });

        if (user && user.role === 'admin') {
            console.log("User is an admin");
            return next();
        } else {
            console.error("User is not an admin");
            return res.status(403).json({ message: "Admin access required" });
        }
    } else {
        console.error("Authentication failed:", req.session);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { isAuthenticated };
