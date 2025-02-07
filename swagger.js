const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Movies and Animes API",
        description: "API for managing movies and animes with authentication.",
    },
    host: "cse-341-project-2-j6y0.onrender.com",  // Change if testing on Render
    schemes: ['https'],  // Change to 'https' if deployed
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