const swaggerJsDoc = require('swagger-jsdoc');

module.exports = () => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'CRUD Boilerplate API',
      version: '1.0.0',
      description: 'CRUD Boilerplate API Swagger Docs',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: ['../api/routes/*.js'],
  };

  return swaggerJsDoc(options);
};
