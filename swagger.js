const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Movies and Animes API",
        description: "API for managing movies and animes with authentication.",
    },
    host: "localhost:3000",  // Change if testing on Render
    schemes: ['http'],  // Change to 'https' if deployed
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        SessionAuth: {
            type: "apiKey",
            name: "Cookie",
            in: "header"
        }
    },
    security: [
        { SessionAuth: [] }
    ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);