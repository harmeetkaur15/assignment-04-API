'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
    host: 'localhost', 
    port: 3000
});
// server.route(require('./routes/books')),
server.route(require('./routes/getbooks')),
server.route(require('./routes/addbooks')),
server.route(require('./routes/updatebooks')),
server.route(require('./routes/deletebooks')),
server.route(require('./routes/getusers')),
server.route(require('./routes/addusers')),
server.route(require('./routes/updateusers')),
server.route(require('./routes/deleteusers'))
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});
