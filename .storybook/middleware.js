const express = require('express');
const bodyParser = require('body-parser');

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.get('/api/users', (request, response) => {
    response.send({ data: { text: 'hello world' } });
  });
};

module.exports = expressMiddleWare;
