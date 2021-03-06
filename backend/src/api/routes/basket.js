const { Router } = require('express');
const route = Router();

module.exports = app => {
  app.use('/basket', route);

  route.get('/', (request, response) => {
    return response.json({}).status(200);
  });

  route.get('/:id', (request, response) => {
    return response.json({}).status(200);
  });

  route.post('/', (request, response) => {
    return response.json({}).status(200);
  });

  route.put('/', (request, response) => {
    return response.json({}).status(200);
  });

  route.delete('/:id', (request, response) => {
    return response.json({}).status(200);
  });
};
