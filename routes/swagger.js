const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { isAuthenticated } = require('../middleware/authenticate');

router.use('/api-docs', isAuthenticated, swaggerUi.serve);
router.get('/api-docs', isAuthenticated, swaggerUi.setup(swaggerDocument));
router.get('/api-docs', (req, res) => {
    console.log("Session inside /api-docs:", req.session);
    res.send(req.session);
});

module.exports = router;