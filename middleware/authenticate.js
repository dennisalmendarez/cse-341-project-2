const isAuthenticated = (req, res, next) => {
    console.log('Session data:', req.session);  // Debugging output
    if (!req.session.user) {
        return res.status(401).json({ message: 'You do not have access.' });
    }
    next();
};
module.exports = { isAuthenticated};