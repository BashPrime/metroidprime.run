// Load configuration file first
var config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location
app.use('/users', require('./routes/users'));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Set Port
const port = config.server.port || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`metroidprime.run server running on localhost:${port}`));
