import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'job-portal-api',
    version: '1.0.0',
    description: 'API documentation for your project',
  },
  servers: [
    {
      url: 'http://localhost:7200/api', // Adjust this to your base URL
      description: 'Development server',
    },
  ],
};

// Options for the swagger docs
const options: Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to your API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
