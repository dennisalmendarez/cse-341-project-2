const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "movies and animes Api",
        description: "API for managing movies and animes.",
    },
    host: "localhost:3001",
    schemes: ['https'],
    };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)