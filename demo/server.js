'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080, host: 'localhost' });

server.register(require('inert'), (err) => {

  server.route({
    method: 'GET',
    path: '/demo/{file}',
    handler: function (request, reply) {
      reply.file('./demo/' + encodeURIComponent(request.params.file));
    }
  });

  server.route({
    method: 'GET',
    path: '/data',
    handler: function (request, reply) {
      reply.file('./demo/data' + request.query.current + '.json');
    }
  });

  server.route({
    method: 'GET',
    path: '/demo/css/{name*}',
    handler: {
      directory: {
          path: 'demo/css',
          redirectToSlash: true
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/dist/{name*}',
    handler: {
      directory: {
          path: 'dist',
          redirectToSlash: true
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/demo/{name*}',
    handler: {
      directory: {
          path: 'demo/',
          redirectToSlash: true
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/lib/{name*}',
    handler: {
      directory: {
          path: 'lib/',
          redirectToSlash: true
      }
    }
  });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});