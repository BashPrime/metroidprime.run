import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as path from 'path';
import * as http from 'http';

import { Utilities } from './utilities';
import { Api } from './routes/api';

const app = express();
let config;

try {
    config = require('../config');
} catch (e) {
    Utilities.generateConfig();
    console.log('You will need to set your config.js file before running the server.');
    process.exit(e.code);
}

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// require('./passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location (all node routes will fall under /api path)
app.use('/api', new Api().router);

// Error handler
app.use((err, req, res, next) => {
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

// Set Port
const port = config.server.port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`metroidprime.run server running on localhost:${port}`));
