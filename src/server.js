const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../views'));
require('./router')(server);

module.exports = server;