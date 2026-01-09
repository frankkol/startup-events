const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger.js');
const router = express();

router.use('/api/users', require('./UserRoutes'));
router.use('/api/events', require('./EventsRoutes'));

// Test route to verify router is working
router.get('/test', (req, res) => {
    res.send('Rota de test OK!')
})

// Route for Swagger API documentation
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;