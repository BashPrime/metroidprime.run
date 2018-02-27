const utilities = require('./utilities');
try {
    require.resolve("../config");
} catch(e) {
    require('./utilities').generateConfig();
    console.log("You will need to set your config.js file before running the server.");
    process.exit(e.code);
}
var config = require('../config');

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const http = require('http');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location (all node routes will fall under /api path)
app.use('/api', require('./routes/api'));

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
      success: false,
      message: err.message
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Set Port
const port = config.server.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`metroidprime.run server running on localhost:${port}`));
