const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get('/', (req, res) => {
res.send(`<h1> test test </h1>`)
});

module.exports = server;