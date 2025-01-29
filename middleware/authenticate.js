const isAuthenticated = (req, res, next) => {
    console.log("🔍 Checking authentication...");
    console.log("Session Data:", req.session); // Debugging log
    
    if (!req.session.user) {
        console.log("🚫 Access Denied - Not Logged In");
        return res.status(401).json({ message: 'You do not have access.' });
    }

    console.log("✅ Access Granted - User is logged in");
    next();
};

module.exports = isAuthenticated;